import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPool } from '../config/db.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadDirectory = path.resolve(__dirname, '../../uploads')

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true })
}

// Get all gallery photos
export async function getGallery(req, res) {
  try {
    const [rows] = await getPool().execute(
      `SELECT id, title, filename, created_at
       FROM gallery
       ORDER BY created_at DESC`
    )

    const gallery = rows.map((item) => ({
      ...item,
      image_url: `${req.protocol}://${req.get('host')}/uploads/${encodeURIComponent(item.filename)}`,
    }))

    return res.json(gallery)
  } catch (error) {
    console.error('Gallery fetch failed:', error.message)

    return res.status(500).json({
      message: 'Unable to load gallery photos.',
    })
  }
}

// Upload a gallery photo
export async function uploadGalleryPhoto(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'Please select an image to upload.',
      })
    }

    const title =
      typeof req.body.title === 'string' ? req.body.title.trim() : ''

    const [result] = await getPool().execute(
      `INSERT INTO gallery (title, filename)
       VALUES (?, ?)`,
      [title, req.file.filename]
    )

    return res.status(201).json({
      message: 'Gallery photo uploaded successfully.',
      id: result.insertId,
      title,
      filename: req.file.filename,
      image_url: `${req.protocol}://${req.get('host')}/uploads/${encodeURIComponent(req.file.filename)}`,
    })
  } catch (error) {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }

    console.error('Gallery upload failed:', error.message)

    return res.status(500).json({
      message: 'Unable to upload gallery photo.',
    })
  }
}

// Delete a gallery photo
export async function deleteGalleryPhoto(req, res) {
  try {
    const { id } = req.params

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        message: 'Invalid gallery photo ID.',
      })
    }

    const [rows] = await getPool().execute(
      'SELECT filename FROM gallery WHERE id = ?',
      [id]
    )

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Gallery photo not found.',
      })
    }

    await getPool().execute(
      'DELETE FROM gallery WHERE id = ?',
      [id]
    )

    const filename = path.basename(rows[0].filename)
    const filePath = path.join(uploadDirectory, filename)

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    return res.json({
      message: 'Gallery photo deleted successfully.',
    })
  } catch (error) {
    console.error('Gallery deletion failed:', error.message)

    return res.status(500).json({
      message: 'Unable to delete gallery photo.',
    })
  }
}