import pool from './pool'
import fs from 'fs'
import path from 'path'

const initDatabase = async () => {
  try {
    console.log('🔍 Checking database connection...')
    
    // Test basic connection
    const result = await pool.query('SELECT 1 as test')
    console.log('✅ Database connection successful')
    
    // Check if users table exists
    try {
      await pool.query('SELECT COUNT(*) FROM users LIMIT 1')
      console.log('✅ Users table exists')
    } catch (error) {
      console.log('⚠️  Users table not found, creating tables...')
      
      // Read and execute schema
      const schemaPath = path.join(__dirname, 'sqlite-schema.sql')
      if (fs.existsSync(schemaPath)) {
        const schema = fs.readFileSync(schemaPath, 'utf8')
        const statements = schema.split(';').filter(stmt => stmt.trim())
        
        for (const statement of statements) {
          if (statement.trim()) {
            await pool.query(statement)
          }
        }
        console.log('✅ Database tables created')
      }
    }
    
    // Check if we have any users
    const userCount = await pool.query('SELECT COUNT(*) as count FROM users')
    console.log(`📊 Users in database: ${userCount.rows[0].count || userCount.rows[0][0]}`)
    
    const count = userCount.rows[0].count || userCount.rows[0]['COUNT(*)'] || userCount.rows[0][0] || 0
    if (parseInt(count) === 0) {
      console.log('🌱 No users found, running seed...')
      // Import and run SQLite seed
      const seedData = require('./sqlite-seed').default
      await seedData()
    } else {
      console.log('✅ Database already seeded')
    }
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    throw error
  }
}

export default initDatabase

// Run if called directly
if (require.main === module) {
  initDatabase().then(() => {
    console.log('🎉 Database initialization complete')
    process.exit(0)
  }).catch((error) => {
    console.error('💥 Database initialization failed:', error)
    process.exit(1)
  })
}