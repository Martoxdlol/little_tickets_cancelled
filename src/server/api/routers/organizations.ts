import { z } from 'zod'
import { slugSchema } from '~/lib/schemas'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { schema } from '~/server/db'

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
                const member = await tx
                    .insert(schema.organizationMembers)
                    .values({
                        organizationId: org!.id,
                        role: 'owner',
                        userId: ctx.session.userId,
                    })
                return org!
            })
        }),
})
