// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration
import { sql } from 'drizzle-orm'
import {
    integer,
    pgTableCreator,
    timestamp,
    varchar,
} from 'drizzle-orm/pg-core'
import { customAlphabet } from 'nanoid'

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `lt_${name}`)

export const updatedAt = timestamp('updated_at', {
    withTimezone: true,
}).$onUpdate(() => new Date())

export const createdAt = timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()

const customNanoId = customAlphabet(
    'ABCDEFGHIJKLMNOPQRSTUVWXYXabcdefghijklmnopqrstuvwxyx0123456789',
    22,
)

export function createId(size?: number) {
    return customNanoId(size)
}

export const columnId = varchar('id', { length: 22 })
    .primaryKey()
    .$defaultFn(() => createId())

export const columnIdXL = varchar('id', { length: 64 })
    .primaryKey()
    .$defaultFn(() => createId(64))

export const organizationId = varchar('organization_id', {
    length: 22,
}).notNull()

export const version = integer('version').notNull().default(1)

export function date(name: string) {
    return timestamp(name, {
        mode: 'date',
        withTimezone: true,
    })
}
