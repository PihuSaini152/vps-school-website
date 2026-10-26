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

// Get admission enquiries
export async function getAdmissionEnquiries(_req, res) {
  try {
    const [rows] = await getPool().execute(
      `SELECT
        id,
        student_name,
        applying_class,
        date_of_birth,
        parent_name,
        mobile_number,
        whatsapp_number,
        email,
        current_school,
        message,
        consent,
        created_at
       FROM admission_enquiries
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

// Delete an admission enquiry
export async function deleteAdmissionEnquiry(req, res) {
  try {
    const { id } = req.params

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        message: 'Invalid enquiry ID.',
      })
    }

    const [result] = await getPool().execute(
      'DELETE FROM admission_enquiries WHERE id = ?',
      [id]
    )

    if (result.affectedRows === 0) {
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

// Get notices for admin
export async function getAdminNotices(_req, res) {
  try {
    const [rows] = await getPool().execute(
      `SELECT id, title, body, is_published, created_at
       FROM notices
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

// Create notice
export async function createNotice(req, res) {
  try {
    const { title, body, is_published = 1 } = req.body

    if (!title?.trim() || !body?.trim()) {
      return res.status(400).json({
        message: 'Notice title and content are required.',
      })
    }

    const [result] = await getPool().execute(
      `INSERT INTO notices (title, body, is_published)
       VALUES (?, ?, ?)`,
      [title.trim(), body.trim(), is_published ? 1 : 0]
    )

    return res.status(201).json({
      message: 'Notice created successfully.',
      id: result.insertId,
    })
  } catch (error) {
    console.error('Notice creation failed:', error.message)

    return res.status(500).json({
      message: 'Unable to create notice.',
    })
  }
}

// Update notice
export async function updateNotice(req, res) {
  try {
    const { title, body, is_published = 1 } = req.body
    const { id } = req.params

    if (!title?.trim() || !body?.trim()) {
      return res.status(400).json({
        message: 'Notice title and content are required.',
      })
    }

    const [result] = await getPool().execute(
      `UPDATE notices
       SET title = ?, body = ?, is_published = ?
       WHERE id = ?`,
      [title.trim(), body.trim(), is_published ? 1 : 0, id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Notice not found.',
      })
    }

    return res.json({
      message: 'Notice updated successfully.',
    })
  } catch (error) {
    console.error('Notice update failed:', error.message)

    return res.status(500).json({
      message: 'Unable to update notice.',
    })
  }
}

// Delete notice
export async function deleteNotice(req, res) {
  try {
    const [result] = await getPool().execute(
      'DELETE FROM notices WHERE id = ?',
      [req.params.id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Notice not found.',
      })
    }

    return res.json({
      message: 'Notice deleted successfully.',
    })
  } catch (error) {
    console.error('Notice deletion failed:', error.message)

    return res.status(500).json({
      message: 'Unable to delete notice.',
    })
  }
}

// Get job applications for admin
export async function getJobApplications(_req, res) {
  try {
    const [rows] = await getPool().execute(
      `SELECT
        id,
        full_name,
        mobile_number,
        email,
        applying_for,
        qualification,
        experience_type,
        total_experience,
        additional_message,
        created_at
       FROM job_applications
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

// Delete a job application
export async function deleteJobApplication(req, res) {
  try {
    const { id } = req.params

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        message: 'Invalid job application ID.',
      })
    }

    const [result] = await getPool().execute(
      'DELETE FROM job_applications WHERE id = ?',
      [id]
    )

    if (result.affectedRows === 0) {
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