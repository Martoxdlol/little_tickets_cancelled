import { and, eq } from 'drizzle-orm'
import { z } from 'zod'
import { slugSchema } from '~/lib/schemas'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { schema } from '~/server/db'
import { getOrganizationBySlug } from '~/server/lib'

export const organizations = createTRPCRouter({
    create: protectedProcedure
        .input(
            z.object({
                name: z.string().min(1).max(255),
                slug: slugSchema,
            }),
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.db.transaction(async (tx) => {
                const [org] = await tx
                    .insert(schema.organizations)
                    .values({
                        name: input.name,
                        slug: input.slug,
                    })
                    .returning()
                await tx.insert(schema.organizationMembers).values({
                    organizationId: org!.id,
                    role: 'owner',
                    userId: ctx.session.userId,
                })
                return org!
            })
        }),
    listMemberships: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.db.query.organizationMembers.findMany({
            where: eq(schema.organizationMembers.userId, ctx.session.user.id),
            with: {
                organization: true,
            },
        })
    }),

    getMembership: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.organizationMembers.findFirst({
                columns: {
                    role: true,
                },
                where: and(
                    eq(schema.organizationMembers.organizationId, input.id),
                    eq(schema.organizationMembers.userId, ctx.session.user.id),
                ),
                with: {
                    organization: {
                        columns: {
                            id: true,
                            name: true,
                            slug: true,
                        },
                    },
                },
            })
        }),

    getBySlug: protectedProcedure
        .input(z.object({ slug: z.string() }))
        .query(async ({ ctx, input }) => {
            return getOrganizationBySlug(ctx.db, input.slug, ctx.session.userId)
        }),
})
