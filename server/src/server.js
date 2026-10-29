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

const uploadsDirectory = path.resolve(__dirname, '../uploads')
const allowedOrigins = [
  'https://vpssikar.com',
  'https://www.vpssikar.com',
  'https://vps-school-website-wine.vercel.app',
  'http://localhost:5173',
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  },
}))

app.use(express.json({ limit: '1mb' }))
app.use('/uploads', express.static(uploadsDirectory))

app.use('/api', apiRoutes)
app.use('/api/admin', adminRoutes)

app.get('/', (_req, res) => {
  res.send('VPS School API is running. Visit /api/health')
})

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ message: 'Internal server error.' })
})

// Local development: start listening.
// On Vercel: export the app for the serverless handler.
if (process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`VPS School API running at http://localhost:${port}`)
  })
}

export default app