import { eq } from 'drizzle-orm'
import { createTRPCRouter, organizationProcedure } from '~/server/api/trpc'
import { schema } from '~/server/db'

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
})
