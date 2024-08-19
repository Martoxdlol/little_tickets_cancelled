import { relations, sql } from 'drizzle-orm'
import { index, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import {
    columnId,
    columnIdXL,
    createdAt,
    createTable,
    date,
    updatedAt,
} from './lib'

export const users = createTable('user', {
    id: columnId,
    name: varchar('name', { length: 256 }).notNull(),
    githubId: varchar('github_id', { length: 256 }).unique(undefined, {
        nulls: 'distinct',
    }),
    createdAt,
    updatedAt,
})

export const sessions = createTable(
    'session',
    {
        id: columnIdXL,
        userId: varchar('user_id', { length: 22 })
            .notNull()
            .references(() => users.id),
        expiresAt: date('expires_at').notNull(),
    },
    (t) => ({
        userIdIndex: index('user_id_index').on(t.userId),
    }),
)

export const sessionRelations = relations(sessions, ({ one }) => ({
    user: one(users, { fields: [sessions.userId], references: [users.id] }),
}))

export const posts = createTable(
    'post',
    {
        id: serial('id').primaryKey(),
        name: varchar('name', { length: 256 }),
        createdAt: timestamp('created_at', { withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
            () => new Date(),
        ),
    },
    (example) => ({
        nameIndex: index('name_idx').on(example.name),
    }),
)
