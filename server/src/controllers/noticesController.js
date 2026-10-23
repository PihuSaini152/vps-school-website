import { getPool } from '../config/db.js'

export async function getNotices(_req, res) {
  try {
    const [rows] = await getPool().execute(
      `SELECT
        id,
        title,
        body AS text,
        DATE_FORMAT(created_at, '%d %b %Y') AS date
       FROM notices
       WHERE is_published = 1
       ORDER BY created_at DESC
       LIMIT 20`
    )

    return res.json(rows)
  } catch (error) {
    console.error('Public notices fetch failed:', error.message)
    return res.status(500).json({
      message: 'Unable to load notices.'
    })
  }
}