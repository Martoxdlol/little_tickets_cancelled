import { users } from './auth'
import {
    columnId,
    createdAt,
    createTable,
    organizationId,
    updatedAt,
    version,
} from './lib'
import { organizations } from './organizations'
import { boolean, index, varchar } from 'drizzle-orm/pg-core'

export const updateTypes = [
    'comment',
    'change_description',
    'assignee',
    'delete_comment',
    'change_comment',
    'status',
    'priority',
] as const

export const statusTypes = [
    'backlog',
    'pending',
    'accepted',
    'in_progress',
    'paused',
    'done',
    'cancelled',
] as const

export const priorityTypes = ['urgent', 'high', 'medium', 'low'] as const

export const tickets = createTable(
    'ticket',
    {
        id: columnId,

        title: varchar('title', { length: 512 }).notNull(),
        description: varchar('description', { length: 1024 * 24 }),

        version,

        status: varchar('status', { length: 32, enum: statusTypes }).notNull(),

        priority: varchar('priority', {
            length: 32,
            enum: priorityTypes,
        }).notNull(),

        channelId: varchar('channel_id', { length: 22 })
            .notNull()
            .references(() => channels.id),

        createdByUserId: varchar('created_by_user_id', {
            length: 22,
        }).references(() => users.id),

        assignedToUserId: varchar('assigned_to_user_id', {
            length: 22,
        }).references(() => users.id),

        reviewerUserId: varchar('reviewer_user_id', {
            length: 22,
        }).references(() => users.id),

        organizationId: organizationId.references(() => organizations.id),

        createdAt,
        updatedAt,
    },
    (t) => ({
        organizationIdIndex: index().on(t.organizationId),
    }),
)

export const ticketUpdates = createTable(
    'ticket_update',
    {
        id: columnId,

        outdated: boolean('outdated').default(false).notNull(),

        originalUpdateId: varchar('original_update_id', { length: 22 }),

        ticketId: varchar('ticket_id', { length: 22 })
            .references(() => tickets.id)
            .notNull(),

        type: varchar('type', { length: 32, enum: updateTypes }),

        status: varchar('status', { length: 32, enum: statusTypes }),

        priority: varchar('priority', {
            length: 32,
            enum: priorityTypes,
        }),

        description: varchar('description', { length: 1024 * 24 }),

        message: varchar('message', { length: 1024 * 24 }),

        createdByUserId: varchar('created_by_user_id', {
            length: 22,
        }).references(() => users.id),

        organizationId: organizationId.references(() => organizations.id),

        createdAt,
    },
    (t) => ({
        organizationIdIndex: index().on(t.organizationId),
        ticketIdIndex: index().on(t.ticketId),
    }),
)

export const channels = createTable(
    'channels',
    {
        id: columnId,

        slug: varchar('slug', { length: 56 }).notNull().unique(),
        name: varchar('name', { length: 256 }).notNull(),

        organizationId: organizationId.references(() => organizations.id),
    },
    (t) => ({
        organizationIdIndex: index().on(t.organizationId),
    }),
)

export const categories = createTable(
    'category',
    {
        id: columnId,

        slug: varchar('slug', { length: 56 }).notNull().unique(),
        name: varchar('name', { length: 256 }).notNull(),

        channelId: varchar('channel_id', { length: 22 }).references(
            () => channels.id,
        ),

        organizationId: organizationId.references(() => organizations.id),
    },
    (t) => ({
        organizationIdIndex: index().on(t.organizationId),
        channelIdIndex: index().on(t.channelId),
    }),
)

export const subcategories = createTable(
    'subcategory',
    {
        id: columnId,

        slug: varchar('slug', { length: 56 }).notNull().unique(),
        name: varchar('name', { length: 256 }).notNull(),

        categoryId: varchar('category_id', { length: 22 }).references(
            () => categories.id,
        ),

        channelId: varchar('channel_id', { length: 22 }).references(
            () => channels.id,
        ),

        organizationId: organizationId.references(() => organizations.id),
    },
    (t) => ({
        organizationIdIndex: index().on(t.organizationId),
        categoryIdIndex: index().on(t.categoryId),
        channelIdIndex: index().on(t.channelId),
    }),
)
