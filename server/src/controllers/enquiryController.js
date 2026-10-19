import { getPool } from '../config/db.js'
export async function createEnquiry(req,res) {
  const {studentName,parentName,className,phone,email='',message=''}=req.body||{}
  if(!studentName||!parentName||!className||!phone) return res.status(400).json({message:'Please provide all required fields.'})
  try {
    const [result]=await getPool().execute(
      'INSERT INTO admission_enquiries (student_name,parent_name,class_name,phone,email,message) VALUES (?,?,?,?,?,?)',
      [studentName.trim(),parentName.trim(),className,phone.trim(),email.trim(),message.trim()]
    )
    return res.status(201).json({message:'Admission enquiry submitted successfully.',id:result.insertId})
  } catch(error) {
    console.error('Admission enquiry save failed:',error.message)
    return res.status(503).json({message:'Database is not connected. Configure MySQL and import database/schema.sql.'})
  }
}
