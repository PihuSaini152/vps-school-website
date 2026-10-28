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

  const normalizedEmail = email.trim()

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
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
    const result = await getPool().query(
      `INSERT INTO public.job_applications
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
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id`,
      [
        fullName.trim(),
        mobile.trim(),
        normalizedEmail,
        applyingFor.trim(),
        qualification.trim(),
        experienceType,
        totalExperience?.trim() || null,
        additionalMessage?.trim() || null,
      ]
    )

    return res.status(201).json({
      message: 'Job application submitted successfully!',
      id: result.rows[0].id,
    })
  } catch (error) {
    console.error('Job application save failed:', error.message)

    return res.status(503).json({
      message: 'Unable to save the job application right now.',
    })
  }
}