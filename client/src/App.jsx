
import { Route, Routes, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'

import Home from './pages/Home/Home.jsx'
import About from './pages/About/About.jsx'
import Facilities from './pages/Facilities/Facilities.jsx'
import Courses from './pages/Courses/Courses.jsx'
import Admissions from './pages/Admissions/Admissions.jsx'
import Contact from './pages/Contact/Contact.jsx'

import AdminLogin from './pages/Admin/AdminLogin.jsx'
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'

export default function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academics" element={<Facilities />} />
          <Route path="/gallery" element={<Courses />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard/*"
            element={<AdminDashboard />}
          />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </>
  )
}
