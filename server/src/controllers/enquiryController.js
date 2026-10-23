
import { getPool } from '../config/db.js'

export async function createEnquiry(req, res) {
  const {
    studentName,
    classApplying,
    dateOfBirth,
    guardianName,
    mobile,
    whatsapp,
    email,
    currentSchool,
    message,
    consent
  } = req.body || {}

  if (
    !studentName?.trim() ||
    !classApplying ||
    !dateOfBirth ||
    !guardianName?.trim() ||
    !mobile?.trim() ||
    !email?.trim() ||
    !message?.trim() ||
    consent !== true
  ) {
    return res.status(400).json({
      message: 'Please fill all required fields and accept the consent checkbox.'
    })
  }

  try {
    const [result] = await getPool().execute(
      `INSERT INTO admission_enquiries
      (
        student_name,
        applying_class,
        date_of_birth,
        parent_name,
        mobile_number,
        whatsapp_number,
        email,
        current_school,
        message,
        consent
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        studentName.trim(),
        classApplying,
        dateOfBirth,
        guardianName.trim(),
        mobile.trim(),
        whatsapp?.trim() || null,
        email.trim(),
        currentSchool?.trim() || null,
        message.trim(),
        1
      ]
    )

    return res.status(201).json({
      message: 'Admission enquiry submitted successfully!',
      id: result.insertId
    })
  } catch (error) {
    console.error('Admission enquiry save failed:', error)

    return res.status(503).json({
      message: 'Unable to save the enquiry right now. Please check the database configuration.'
    })
  }
}
