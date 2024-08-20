import { users } from './auth'
import { createTable, organizationId } from './lib'
import { organizations } from './organizations'
import { channels } from './tickets'
import { boolean, index, text, varchar } from 'drizzle-orm/pg-core'

const organizationMembersRoles = ['owner', 'admin', 'member'] as const

export const organizationMembers = createTable(
    'organization_member',
    {
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

export const channelMembers = createTable(
    'channel_member',
    {
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

export const organizationMemberInvitations = createTable(
    'organization_member_invitation',
    {
        email: varchar('email', { length: 256 }).notNull(),
        role: text('role', { enum: organizationMembersRoles }).notNull(),
        organizationId: organizationId.references(() => organizations.id),
    },
    (t) => ({
        emailIndex: index().on(t.email),
        organizationIdIndex: index().on(t.organizationId),
    }),
)
