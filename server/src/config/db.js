import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()
let pool
export function getPool() {
  if (!pool) pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'vps_school',
    waitForConnections: true, connectionLimit: 5, queueLimit: 0,
  })
  return pool
}
export async function testDatabase() {
  const connection = await getPool().getConnection()
  try { await connection.ping() } finally { connection.release() }
}
