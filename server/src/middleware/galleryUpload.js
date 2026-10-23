import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadDirectory = path.resolve(__dirname, '../../uploads')

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDirectory)
  },

  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase()
    const uniqueName =
      `gallery-${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`

    cb(null, uniqueName)
  },
})

const allowedTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]

const fileFilter = (_req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Only JPG, PNG, WEBP, and GIF images are allowed.'))
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
})