import fs from 'fs'
import path from 'path'
import pool from './pool'

const migrate = async () => {
  try {
    console.log('Running database migrations...')
    
    const schemaPath = path.join(__dirname, 'schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')
    
    await pool.query(schema)
    
    console.log('Database migrations completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

migrate()