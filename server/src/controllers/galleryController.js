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

// Website Image Manager: supported pages and image slots
const WEBSITE_IMAGE_SLOTS = {
  about: [
    {
      image_key: 'school-group',
      title: 'School Community',
      default_url: '/About/school-group.jpg',
    },
    {
      image_key: 'school-program',
      title: 'School Program',
      default_url: '/About/school-program.jpg',
    },
    {
      image_key: 'school-building',
      title: 'School Building',
      default_url: '/About/school-building.jpg',
    },
    {
      image_key: 'chairman',
      title: 'Chairman',
      default_url: '/About/Chairmen.jpg',
    },
    {
      image_key: 'director',
      title: 'Director',
      default_url: '/About/Diractor.jpg',
    },
    {
      image_key: 'manager',
      title: 'Management Coordinator',
      default_url: '/About/Manger.jpg',
    },
  ],
}

export async function getWebsiteImages(req, res) {
  try {
    const pageKey = String(req.query.page || '').trim().toLowerCase()

    if (!WEBSITE_IMAGE_SLOTS[pageKey]) {
      return res.status(400).json({
        message: 'Invalid page selected.',
      })
    }

    const [rows] = await getPool().execute(
      `SELECT id, page_key, image_key, title, image_url, updated_at
       FROM website_images
       WHERE page_key = ?
       ORDER BY id ASC`,
      [pageKey]
    )

    const savedImages = new Map(
      rows.map((item) => [item.image_key, item])
    )

    const images = WEBSITE_IMAGE_SLOTS[pageKey].map((slot) => {
      const saved = savedImages.get(slot.image_key)

      return {
        ...slot,
        id: saved?.id ?? null,
        page_key: pageKey,
        image_url: saved?.image_url || slot.default_url,
        is_custom: Boolean(saved),
        updated_at: saved?.updated_at || null,
      }
    })

    return res.json(images)
  } catch (error) {
    console.error('Website images fetch failed:', error.message)

    return res.status(500).json({
      message: 'Unable to load website images.',
    })
  }
}


// Replace an image on a website page
export async function replaceWebsiteImage(req, res) {
  let uploadedFilePath = null

  try {
    const pageKey = String(req.params.page || '').trim().toLowerCase()
    const imageKey = String(req.params.imageKey || '').trim()

    if (!WEBSITE_IMAGE_SLOTS[pageKey]) {
      return res.status(400).json({
        message: 'Invalid website page selected.',
      })
    }

    const imageSlot = WEBSITE_IMAGE_SLOTS[pageKey].find(
      (slot) => slot.image_key === imageKey
    )

    if (!imageSlot) {
      return res.status(400).json({
        message: 'Invalid image selected.',
      })
    }

    if (!req.file) {
      return res.status(400).json({
        message: 'Please select an image to upload.',
      })
    }

    uploadedFilePath = req.file.path

    // Save a relative URL so the frontend can use its configured API URL.
    const imageUrl = `/uploads/${encodeURIComponent(req.file.filename)}`

    const [existingRows] = await getPool().execute(
      `SELECT id, image_url
       FROM website_images
       WHERE page_key = ? AND image_key = ?`,
      [pageKey, imageKey]
    )

    await getPool().execute(
      `INSERT INTO website_images
         (page_key, image_key, title, image_url)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         title = VALUES(title),
         image_url = VALUES(image_url)`,
      [pageKey, imageKey, imageSlot.title, imageUrl]
    )

    // Delete the previous uploaded file only if it was stored in /uploads.
    if (existingRows.length > 0) {
      const previousUrl = existingRows[0].image_url

      if (typeof previousUrl === 'string' &&
          previousUrl.startsWith('/uploads/')) {
        const previousFilename = path.basename(
          decodeURIComponent(previousUrl.slice('/uploads/'.length))
        )

        const previousFilePath = path.join(
          uploadDirectory,
          previousFilename
        )

        if (
          previousFilename &&
          previousFilename !== req.file.filename &&
          fs.existsSync(previousFilePath)
        ) {
          fs.unlinkSync(previousFilePath)
        }
      }
    }

    return res.json({
      message: 'Website image replaced successfully.',
      page_key: pageKey,
      image_key: imageKey,
      title: imageSlot.title,
      image_url: imageUrl,
    })
  } catch (error) {
    if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
      fs.unlinkSync(uploadedFilePath)
    }

    console.error('Website image replacement failed:', error.message)

    return res.status(500).json({
      message: 'Unable to replace website image.',
    })
  }
}
