import { drizzle, PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '~/env'

import { ExtractTablesWithRelations } from 'drizzle-orm'
import { PgTransaction } from 'drizzle-orm/pg-core'
import * as schema from './schema'

export { schema }

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
    conn: postgres.Sql | undefined
}

const conn = globalForDb.conn ?? postgres(env.DATABASE_URL)
if (env.NODE_ENV !== 'production') globalForDb.conn = conn

export const db = drizzle(conn, { schema })

export type Database = typeof db

export type DatabaseTransaction = PgTransaction<
    PostgresJsQueryResultHKT,
    typeof schema,
    ExtractTablesWithRelations<typeof schema>
>

export type DBTX = Database | DatabaseTransaction
