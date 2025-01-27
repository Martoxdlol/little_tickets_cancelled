import { users } from './auth'
import { columnId, createTable, organizationId } from './lib'
import { organizations } from './organizations'
import { channels } from './tickets'
import { relations } from 'drizzle-orm'
import { boolean, index, text, varchar } from 'drizzle-orm/pg-core'

const organizationMembersRoles = ['owner', 'admin', 'member'] as const

export const organizationMembers = createTable(
    'organization_member',
    {
        id: columnId,
        userId: varchar('user_id', { length: 22 })
            .notNull()
            .references(() => users.id),

        role: text('role', { enum: organizationMembersRoles }).notNull(),

        organizationId: organizationId.references(() => organizations.id),
    },
    (t) => ({
        userIdIndex: index().on(t.userId),
        organizationIdIndex: index().on(t.organizationId),
    }),
)

export const organizationMembersRelations = relations(
    organizationMembers,
    ({ one }) => ({
        organization: one(organizations, {
            fields: [organizationMembers.organizationId],
            references: [organizations.id],
        }),
    }),
)

export const channelMembers = createTable(
    'channel_member',
    {
        id: columnId,
        userId: varchar('user_id', { length: 22 })
            .notNull()
            .references(() => users.id),

        createNew: boolean('create_new'),
        viewAll: boolean('view_all'),
        commentOnAll: boolean('comment_on_all'),
        manageAll: boolean('manage_all'),
        manageAssignedSelf: boolean('manage_assigned_self'),
        fullAdmin: boolean('full_admin').default(false).notNull(),

        channelId: varchar('channel_id', { length: 22 })
            .notNull()
            .references(() => channels.id),

        organizationId: organizationId.references(() => organizations.id),
    },
    (t) => ({
        userIdIndex: index().on(t.userId),
        organizationIdIndex: index().on(t.organizationId),
    }),
)

export const channelMembersRelations = relations(channelMembers, ({ one }) => ({
    user: one(users, {
        fields: [channelMembers.userId],
        references: [users.id],
    }),
    channel: one(channels, {
        fields: [channelMembers.channelId],
        references: [channels.id],
    }),
    organization: one(organizations, {
        fields: [channelMembers.organizationId],
        references: [organizations.id],
    }),
}))

export const organizationMemberInvitations = createTable(
    'organization_member_invitation',
    {
        id: columnId,
        email: varchar('email', { length: 256 }).notNull(),
        role: text('role', { enum: organizationMembersRoles }).notNull(),
        organizationId: organizationId.references(() => organizations.id),
    },
    (t) => ({
        emailIndex: index().on(t.email),
        organizationIdIndex: index().on(t.organizationId),
    }),
)
