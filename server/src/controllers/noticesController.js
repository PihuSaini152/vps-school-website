import { getPool } from '../config/db.js'

export async function getNotices(_req, res) {
  try {
    const { rows } = await getPool().query(
      `SELECT
        id,
        title,
        body AS text,
        TO_CHAR(created_at, 'DD Mon YYYY') AS date
       FROM public.notices
       WHERE is_published = TRUE
       ORDER BY created_at DESC
       LIMIT 20`
    )

    return res.json(rows)
  } catch (error) {
    console.error('Public notices fetch failed:', error.message)
    return res.status(500).json({
      message: 'Unable to load notices.',
    })
  }
}