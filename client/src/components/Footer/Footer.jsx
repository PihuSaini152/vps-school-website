import { Link } from 'react-router-dom'
import { school, navigation } from '../../data/school.js'
import './Footer.css'
export default function Footer() {
  return <footer className="site-footer"><div className="footer-grid">
    <div><strong className="footer-brand">{school.name}</strong><p>{school.tagline}</p><small>School details will be updated after client confirmation.</small></div>
    <div className="footer-links"><h3>Quick Links</h3>{navigation.map(item => <Link key={item.to} to={item.to}>{item.label}</Link>)}</div>
    <div><h3>Contact</h3><p>{school.address}</p><p>{school.phone}</p><p>{school.email}</p></div>
  </div><div className="footer-bottom">© {new Date().getFullYear()} {school.name}. All rights reserved.</div></footer>
}
