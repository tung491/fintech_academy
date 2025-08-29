import Database from 'better-sqlite3'
import path from 'path'

const dbPath = path.join(__dirname, '../../finacademy.db')
const db = new Database(dbPath)

// Enable foreign keys
db.pragma('foreign_keys = ON')

// Convert PostgreSQL-style queries to SQLite
export const query = (sql: string, params: any[] = []): { rows: any[] } => {
  try {
    // Convert PostgreSQL parameter placeholders ($1, $2) to SQLite (?, ?)
    const sqliteQuery = sql.replace(/\$(\d+)/g, '?')
    
    if (sql.trim().toLowerCase().startsWith('select')) {
      const stmt = db.prepare(sqliteQuery)
      const rows = stmt.all(params)
      return { rows }
    } else {
      const stmt = db.prepare(sqliteQuery)
      const result = stmt.run(params)
      return { rows: [{ id: result.lastInsertRowid, ...result }] }
    }
  } catch (error) {
    console.error('SQLite query error:', error)
    console.error('Query:', sql)
    console.error('Params:', params)
    throw error
  }
}

export default {
  query,
  end: () => db.close()
}