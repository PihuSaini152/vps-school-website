import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './pages/Home/Home.jsx'
import About from './pages/About/About.jsx'
import Academics from './pages/Academics/Academics.jsx'
import Gallery from './pages/Gallery/Gallery.jsx'
import Admissions from './pages/Admissions/Admissions.jsx'
import Contact from './pages/Contact/Contact.jsx'
import Admin from './pages/Admin/Admin.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'
export default function App() {
  return <><Navbar /><main><Routes>
    <Route path="/" element={<Home />} /><Route path="/about" element={<About />} />
    <Route path="/academics" element={<Academics />} /><Route path="/gallery" element={<Gallery />} />
    <Route path="/admissions" element={<Admissions />} /><Route path="/contact" element={<Contact />} />
    <Route path="/admin" element={<Admin />} /><Route path="*" element={<NotFound />} />
  </Routes></main><Footer /></>
}
