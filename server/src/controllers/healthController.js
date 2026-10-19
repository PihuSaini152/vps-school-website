import { testDatabase } from '../config/db.js'
export async function getHealth(_req,res) {
  let database='disconnected'
  try { await testDatabase(); database='connected' } catch {}
  res.json({ok:true,message:'VPS School API is running',database})
}
