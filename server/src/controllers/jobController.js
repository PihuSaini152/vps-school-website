
import { getPool } from '../config/db.js'

export async function createJobApplication(req, res) {
  const {
    fullName,
    mobile,
    email,
    applyingFor,
    qualification,
    experienceType,
    totalExperience,
    additionalMessage,
  } = req.body || {}

  if (
    !fullName?.trim() ||
    !mobile?.trim() ||
    !email?.trim() ||
    !applyingFor?.trim() ||
    !qualification?.trim() ||
    !['Fresher', 'Experienced'].includes(experienceType)
  ) {
    return res.status(400).json({
      message: 'Please fill all required fields correctly.',
    })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({
      message: 'Please enter a valid email address.',
    })
  }

  if (experienceType === 'Experienced' && !totalExperience?.trim()) {
    return res.status(400).json({
      message: 'Please enter your total experience.',
    })
  }

  try {
    const [result] = await getPool().execute(
      `INSERT INTO job_applications
      (
        full_name,
        mobile_number,
        email,
        applying_for,
        qualification,
        experience_type,
        total_experience,
        additional_message
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fullName.trim(),
        mobile.trim(),
        email.trim(),
        applyingFor.trim(),
        qualification.trim(),
        experienceType,
        totalExperience?.trim() || null,
        additionalMessage?.trim() || null,
      ]
    )

    return res.status(201).json({
      message: 'Job application submitted successfully!',
      id: result.insertId,
    })
  } catch (error) {
    console.error('Job application save failed:', error.message)

    return res.status(503).json({
      message: 'Unable to save the job application right now.',
    })
  }
}
