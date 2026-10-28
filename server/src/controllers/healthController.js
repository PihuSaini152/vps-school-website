import { testDatabase } from '../config/db.js'

export async function getHealth(_req, res) {
  try {
    await testDatabase()

    return res.json({
      ok: true,
      message: 'VPS School API is running',
      database: 'connected',
    })
  } catch (error) {
    // Log the actual reason in the local server terminal.
    console.error('Database connection failed:', error.message)

    return res.status(503).json({
      ok: false,
      message: 'VPS School API is running, but the database connection failed.',
      database: 'disconnected',
    })
  }
}