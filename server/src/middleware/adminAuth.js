import jwt from 'jsonwebtoken'

export function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const [scheme, token] = authHeader.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      message: 'Please log in to access the admin panel.'
    })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    if (payload.role !== 'admin') {
      return res.status(403).json({
        message: 'Access denied.'
      })
    }

    req.admin = payload
    next()
  } catch {
    return res.status(401).json({
      message: 'Session expired. Please log in again.'
    })
  }
}
