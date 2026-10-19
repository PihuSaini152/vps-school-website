import { useState } from 'react'
import PageHero from '../../components/PageHero/PageHero.jsx'
import { submitAdmissionEnquiry } from '../../services/api.js'
import './Admissions.css'
const empty = {studentName:'',parentName:'',className:'',phone:'',email:'',message:''}
export default function Admissions() {
  const [form,setForm]=useState(empty); const [status,setStatus]=useState('')
  const update=e=>setForm({...form,[e.target.name]:e.target.value})
  async function submit(e){e.preventDefault();setStatus('Submitting...');try{const r=await submitAdmissionEnquiry(form);setStatus(r.message);setForm(empty)}catch(err){setStatus(err.message)}}
  return <><PageHero eyebrow="ADMISSIONS" title="Admission Enquiry" subtitle="Form structure is ready; final wording can be adjusted after client confirmation."/><section className="container admission-page"><form className="admission-form" onSubmit={submit}>
    <label>Student name *<input name="studentName" value={form.studentName} onChange={update} required/></label>
    <label>Parent / guardian name *<input name="parentName" value={form.parentName} onChange={update} required/></label>
    <label>Class for admission *<select name="className" value={form.className} onChange={update} required><option value="">Select class</option>{['Nursery','LKG','UKG','1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th'].map(x=><option key={x}>{x}</option>)}</select></label>
    <label>Mobile number *<input name="phone" value={form.phone} onChange={update} required inputMode="tel"/></label>
    <label>Email (optional)<input type="email" name="email" value={form.email} onChange={update}/></label>
    <label>Message (optional)<textarea name="message" rows="4" value={form.message} onChange={update}/></label>
    <button className="btn">Submit Enquiry</button>{status&&<p className="form-status" role="status">{status}</p>}
  </form></section></>
}
