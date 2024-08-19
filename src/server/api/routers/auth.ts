import { TRPCError } from '@trpc/server'
import { and, eq, isNull } from 'drizzle-orm'
import { z } from 'zod'
import { langs } from '~/i18n/lib'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { schema } from '~/server/db'

export const auth = createTRPCRouter({
    getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
        const user = await ctx.db.query.users.findFirst({
            where: eq(schema.users.id, ctx.session.userId),
        })

        if (!user) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'User not found (but should be)',
            })
        }

        return user
    }),
    completeOnboarding: protectedProcedure
        .input(
            z.object({
                name: z.string().min(1).max(255),
                locale: z.enum(langs),
                email: z.string().email().nullable(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const result = await ctx.db
                .update(schema.users)
                .set({
                    name: input.name,
                    locale: input.locale,
                    onboardingCompletedAt: new Date(),
                    email: input.email,
                    emailVerifiedAt:
                        !!input.email &&
                        input.email === ctx.session.user.email &&
                        ctx.session.user.emailVerified
                            ? undefined // keep the current value
                            : null, // reset to unverified
                })
                .where(
                    and(
                        eq(schema.users.id, ctx.session.userId),
                        isNull(schema.users.onboardingCompletedAt),
                    ),
                )
                .returning()

            const user = result[0]
            if (!user) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Failed to complete onboarding',
                })
            }
        }),
})
