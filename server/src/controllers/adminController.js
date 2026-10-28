import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getPool } from '../config/db.js'

// Admin login
export async function adminLogin(req, res) {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({
        message: 'Username and password are required.',
      })
    }

    const expectedUsername = process.env.ADMIN_USERNAME
    const passwordHash = process.env.ADMIN_PASSWORD_HASH

    if (!expectedUsername || !passwordHash || !process.env.JWT_SECRET) {
      console.error('Admin login environment variables are missing.')

      return res.status(500).json({
        message: 'Admin login is not configured correctly.',
      })
    }

    const usernameMatches = username === expectedUsername
    const passwordMatches = await bcrypt.compare(password, passwordHash)

    if (!usernameMatches || !passwordMatches) {
      return res.status(401).json({
        message: 'Invalid username or password.',
      })
    }

    const token = jwt.sign(
      { username: expectedUsername, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    )

    return res.json({
      message: 'Login successful.',
      token,
      admin: { username: expectedUsername },
    })
  } catch (error) {
    console.error('Admin login failed:', error.message)

    return res.status(500).json({
      message: 'Unable to log in right now.',
    })
  }
}

export async function getAdmissionEnquiries(_req, res) {
  try {
    const { rows } = await getPool().query(
      `SELECT id, student_name, applying_class, date_of_birth,
              parent_name, mobile_number, whatsapp_number, email,
              current_school, message, consent, created_at
       FROM public.admission_enquiries
       ORDER BY created_at DESC`
    )

    return res.json(rows)
  } catch (error) {
    console.error('Admission enquiries fetch failed:', error.message)
    return res.status(500).json({
      message: 'Unable to load admission enquiries.',
    })
  }
}
export async function deleteAdmissionEnquiry(req, res) {
  try {
    const { id } = req.params

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ message: 'Invalid enquiry ID.' })
    }

    const result = await getPool().query(
      'DELETE FROM public.admission_enquiries WHERE id = $1',
      [id]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: 'Admission enquiry not found.',
      })
    }

    return res.json({
      success: true,
      message: 'Admission enquiry deleted successfully.',
    })
  } catch (error) {
    console.error('Admission enquiry deletion failed:', error.message)
    return res.status(500).json({
      message: 'Unable to delete admission enquiry.',
    })
  }
}
export async function getAdminNotices(_req, res) {
  try {
    const { rows } = await getPool().query(
      `SELECT id, title, body, is_published, created_at
       FROM public.notices
       ORDER BY created_at DESC`
    )

    return res.json(rows)
  } catch (error) {
    console.error('Admin notices fetch failed:', error.message)
    return res.status(500).json({
      message: 'Unable to load notices.',
    })
  }
}
export async function createNotice(req, res) {
  try {
    const { title, body, is_published = true } = req.body

    if (!title?.trim() || !body?.trim()) {
      return res.status(400).json({
        message: 'Title and notice content are required.',
      })
    }

    const { rows } = await getPool().query(
      `INSERT INTO public.notices (title, body, is_published)
       VALUES ($1, $2, $3)
       RETURNING id, title, body, is_published, created_at`,
      [title.trim(), body.trim(), is_published]
    )

    return res.status(201).json({
      success: true,
      message: 'Notice created successfully.',
      notice: rows[0],
    })
  } catch (error) {
    console.error('Notice creation failed:', error.message)
    return res.status(500).json({
      message: 'Unable to create notice.',
    })
  }
}

export async function updateNotice(req, res) {
  try {
    const { id } = req.params
    const { title, body, is_published } = req.body

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ message: 'Invalid notice ID.' })
    }

    if (!title?.trim() || !body?.trim()) {
      return res.status(400).json({
        message: 'Title and notice content are required.',
      })
    }

    const { rows } = await getPool().query(
      `UPDATE public.notices
       SET title = $1, body = $2, is_published = $3
       WHERE id = $4
       RETURNING id, title, body, is_published, created_at`,
      [title.trim(), body.trim(), is_published ?? true, id]
    )

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Notice not found.' })
    }

    return res.json({
      success: true,
      message: 'Notice updated successfully.',
      notice: rows[0],
    })
  } catch (error) {
    console.error('Notice update failed:', error.message)
    return res.status(500).json({
      message: 'Unable to update notice.',
    })
  }
}
export async function deleteNotice(req, res) {
  try {
    const { id } = req.params

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ message: 'Invalid notice ID.' })
    }

    const result = await getPool().query(
      'DELETE FROM public.notices WHERE id = $1',
      [id]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Notice not found.' })
    }

    return res.json({
      success: true,
      message: 'Notice deleted successfully.',
    })
  } catch (error) {
    console.error('Notice deletion failed:', error.message)
    return res.status(500).json({
      message: 'Unable to delete notice.',
    })
  }
}
export async function getJobApplications(_req, res) {
  try {
    const { rows } = await getPool().query(
      `SELECT id, full_name, mobile_number, email, applying_for,
              qualification, experience_type, total_experience,
              additional_message, created_at
       FROM public.job_applications
       ORDER BY created_at DESC`
    )

    return res.json(rows)
  } catch (error) {
    console.error('Job applications fetch failed:', error.message)
    return res.status(500).json({
      message: 'Unable to load job applications.',
    })
  }
}

export async function deleteJobApplication(req, res) {
  try {
    const { id } = req.params

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        message: 'Invalid job application ID.',
      })
    }

    const result = await getPool().query(
      'DELETE FROM public.job_applications WHERE id = $1',
      [id]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: 'Job application not found.',
      })
    }

    return res.json({
      success: true,
      message: 'Job application deleted successfully.',
    })
  } catch (error) {
    console.error('Job application deletion failed:', error.message)
    return res.status(500).json({
      message: 'Unable to delete job application.',
    })
  }
}