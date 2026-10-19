import { Mail, MapPin, Phone } from 'lucide-react'
import PageHero from '../../components/PageHero/PageHero.jsx'
import { school } from '../../data/school.js'
import './Contact.css'
export default function Contact() {
  return <><PageHero eyebrow="CONTACT US" title="Contact the School" subtitle="Verified contact information will be added after client confirmation."/><section className="container contact-page">
    <article><MapPin/><div><strong>Address</strong><p>{school.address}</p></div></article>
    <article><Phone/><div><strong>Phone / WhatsApp</strong><p>{school.phone}</p></div></article>
    <article><Mail/><div><strong>Email</strong><p>{school.email}</p></div></article>
  </section></>
}
