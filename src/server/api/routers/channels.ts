import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { smallSlugSchema } from '~/lib/schemas'
import { createTRPCRouter, organizationProcedure } from '~/server/api/trpc'
import { db, schema } from '~/server/db'
import { createId } from '~/server/db/schema/lib'

export const channels = createTRPCRouter({
    list: organizationProcedure.query(async ({ ctx }) => {
        const channels = await ctx.db.query.channels.findMany({
            where: eq(schema.channels.organizationId, ctx.organization.id),
            with: {
                members: {
                    where: eq(
                        schema.channelMembers.userId,
                        ctx.session.user.id,
                    ),
                },
            },
        })

        if (ctx.organization.role !== 'member') {
            return channels
        }

        return channels.filter((channel) => {
            return channel.members.length > 0
        })
    }),

    create: organizationProcedure
        .input(
            z.object({
                name: z.string(),
                slug: smallSlugSchema,
            }),
        )
        .mutation(async ({ ctx, input }) => {
            if (ctx.organization.role === 'member') {
                return new TRPCError({
                    code: 'FORBIDDEN',
                })
            }

            return await db.transaction(async (tx) => {
                const id = createId()

                await tx.insert(schema.channels).values({
                    id,
                    name: input.name,
                    slug: input.slug,
                    organizationId: ctx.organization.id,
                })

                await tx.insert(schema.channelMembers).values({
                    channelId: id,
                    userId: ctx.session.user.id,
                    fullAdmin: true,
                    commentOnAll: true,
                    viewAll: true,
                    createNew: true,
                    manageAssignedSelf: true,
                    manageAll: true,
                    organizationId: ctx.organization.id,
                })

                return { id }
            })
        }),
})
