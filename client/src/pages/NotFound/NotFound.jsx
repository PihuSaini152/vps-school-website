import { Link } from 'react-router-dom'
import './NotFound.css'
export default function NotFound() { return <section className="not-found"><h1>Page not found</h1><p>यह पेज उपलब्ध नहीं है।</p><Link className="btn" to="/">Home Page पर जाएँ</Link></section> }
