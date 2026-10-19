import { ShieldCheck } from 'lucide-react'
import './Admin.css'
export default function Admin() {
  return <section className="admin-page"><div className="admin-card"><ShieldCheck size={38}/><span className="eyebrow">PRIVATE AREA</span><h1>Admin Panel Setup</h1><p>यह केवल starter placeholder है। इसमें अभी secure login नहीं है। Final requirements तय होने के बाद authentication और content management बनाया जाएगा।</p></div></section>
}
