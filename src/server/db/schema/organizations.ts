import { columnId, createTable } from './lib'
import { channelMembers, organizationMembers } from './roles'
import { channels } from './tickets'
import { relations } from 'drizzle-orm'
import { boolean, varchar } from 'drizzle-orm/pg-core'

export const organizations = createTable('organization', {
    id: columnId,

    name: varchar('name', { length: 256 }).notNull(),
    slug: varchar('slug', { length: 56 }).notNull().unique(),

    defaultChannelCreateNew: boolean('default_channel_create_new').default(
        false,
    ),
    defaultChannelViewAll: boolean('default_channel_view_all').default(false),
    defaultChannelManageAll: boolean('default_channel_manage_all').default(
        false,
    ),
    defaultChannelManageAssignedSelf: boolean(
        'default_channel_manage_assigned_self',
    ).default(false),
})

export const organizationsRelations = relations(organizations, ({ many }) => ({
    channels: many(channels),
    channelMembers: many(channelMembers),
    members: many(organizationMembers),
}))
