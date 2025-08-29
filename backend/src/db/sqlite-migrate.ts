import fs from 'fs'
import path from 'path'
import Database from 'better-sqlite3'

const migrate = async () => {
  try {
    console.log('Running SQLite database migrations...')
    
    const dbPath = path.join(__dirname, '../../finacademy.db')
    const db = new Database(dbPath)
    
    const schemaPath = path.join(__dirname, 'sqlite-schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')
    
    // Execute schema in parts (SQLite doesn't support multiple statements well)
    const statements = schema.split(';').filter(stmt => stmt.trim())
    
    db.transaction(() => {
      statements.forEach(statement => {
        if (statement.trim()) {
          db.exec(statement + ';')
        }
      })
    })()
    
    db.close()
    console.log('SQLite database migrations completed successfully!')
    console.log('Database created at:', dbPath)
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

migrate()