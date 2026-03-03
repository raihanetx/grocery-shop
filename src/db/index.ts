import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as schema from './schema'

// SQLite connection using libsql (works in both Bun and Node.js)
const client = createClient({
  url: process.env.DATABASE_URL || 'file:./db/custom.db'
})

// Drizzle database instance
export const db = drizzle(client, { schema })

// Export schema for convenience
export * from './schema'

// Type exports
export type Database = typeof db
