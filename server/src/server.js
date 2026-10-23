import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

import apiRoutes from './routes/apiRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

dotenv.config()

const app = express()
const port = Number(process.env.PORT || 5000)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Server uploads directory: server/uploads
const uploadsDirectory = path.resolve(__dirname, '../uploads')

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
}))

app.use(express.json({ limit: '1mb' }))

// Serve uploaded gallery images
app.use('/uploads', express.static(uploadsDirectory))

// API routes
app.use('/api', apiRoutes)
app.use('/api/admin', adminRoutes)

app.get('/', (_req, res) =>
  res.send('VPS School API is running. Visit /api/health')
)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ message: 'Internal server error.' })
})

app.listen(port, () =>
  console.log(`VPS School API listening at http://localhost:${port}`)
)
