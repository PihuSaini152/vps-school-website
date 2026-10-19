
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";


const SCHOOL_INFO = {
  phone: "8302977245",
  email: "vbpssikar@gmail.com",
  instagram: "https://www.instagram.com/vbpssikar/",
  facebook: "https://www.facebook.com/vpsrbse/",
  youtube: "https://www.youtube.com/@VbpsSikar",
};


const navigation = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Facilities", path: "/academics" },
  { label: "Courses", path: "/gallery" },
  { label: "Admissions", path: "/admissions" },
  { label: "Contact", path: "/contact" },
];

function SocialIcon({ type }) {
  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle
          cx="17.5"
          cy="6.5"
          r="0.8"
          className="vps-icon-fill"
        />
      </svg>
    );
  }

  if (type === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 21v-8h3l.5-4H14V7c0-1.2.4-2 2-2h1.7V1.4C17 1.2 16 1 14.5 1 11.4 1 9.5 2.9 9.5 6.5V9H6v4h3.5v8H14Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23 7.1a3 3 0 0 0-2.1-2.2C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 0 0 1 7.1 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.9 3 3 0 0 0 2.1 2.2c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.2 31 31 0 0 0 .5-4.9 31 31 0 0 0-.5-4.9ZM9.5 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 3h4l2 5-2.5 1.5a15 15 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2C10 20.5 3.5 14 3 5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return open ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="vps-header">
      {/* TOP INFORMATION BAR */}
      <div className="vps-topbar">
        <div className="vps-topbar-inner">
          <div className="vps-topbar-contact">
            <a
              href={SCHOOL_INFO.phone ? `tel:${SCHOOL_INFO.phone}` : undefined}
              className={`vps-topbar-item ${
                !SCHOOL_INFO.phone ? "is-placeholder" : ""
              }`}
              onClick={
                !SCHOOL_INFO.phone
                  ? (event) => event.preventDefault()
                  : undefined
              }
            >
              <PhoneIcon />
              <span>
                <strong>Helpline:</strong>{" "}
                {SCHOOL_INFO.phone || "Add phone number"}
              </span>
            </a>

            <a
              href={
                SCHOOL_INFO.email
                  ? `mailto:${SCHOOL_INFO.email}`
                  : undefined
              }
              className={`vps-topbar-item ${
                !SCHOOL_INFO.email ? "is-placeholder" : ""
              }`}
              onClick={
                !SCHOOL_INFO.email
                  ? (event) => event.preventDefault()
                  : undefined
              }
            >
              <MailIcon />
              <span>
                <strong>Email:</strong>{" "}
                {SCHOOL_INFO.email || "Add school email"}
              </span>
            </a>
          </div>

          <div className="vps-social-links" aria-label="Social media links">
            {["instagram", "facebook", "youtube"].map((social) => (
              <a
                key={social}
                href={SCHOOL_INFO[social] || undefined}
                target="_blank"
                rel="noreferrer"
                aria-label={social}
                title={social}
                className={!SCHOOL_INFO[social] ? "is-placeholder" : ""}
                onClick={
                  !SCHOOL_INFO[social]
                    ? (event) => event.preventDefault()
                    : undefined
                }
              >
                <SocialIcon type={social} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="vps-nav-container">
        <Link to="/" className="vps-brand" onClick={closeMenu}>
          <img
            src="/Navbar/Logo.PNG"
            alt="VPS School Logo"
            className="vps-logo"
          />

          <span className="vps-brand-text">
            <strong>VPS School</strong>
            <small>Shaping Better Tomorrows</small>
          </span>
        </Link>

        <nav className="vps-nav-links" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `vps-nav-link ${isActive ? "is-active" : ""}`
              }
            >
              <span className="vps-nav-label">{item.label}</span>
            </NavLink>
          ))}

          <NavLink to="/admissions" className="vps-apply-btn">
            Apply Now <span aria-hidden="true">↗</span>
          </NavLink>
        </nav>

        <button
          type="button"
          className="vps-menu-toggle"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="vps-mobile-drawer"
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      <button
        type="button"
        className={`vps-drawer-overlay ${menuOpen ? "is-visible" : ""}`}
        onClick={closeMenu}
        aria-label="Close navigation"
        tabIndex={menuOpen ? 0 : -1}
      />

      {/* MOBILE DRAWER */}
      <aside
        id="vps-mobile-drawer"
        className={`vps-mobile-drawer ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="vps-drawer-header">
          <Link to="/" className="vps-drawer-brand" onClick={closeMenu}>
            <img src="/Navbar/Logo.PNG" alt="" />
            <span>
              <strong>VPS School</strong>
              <small>Learning · Growth · Success</small>
            </span>
          </Link>

          <button
            type="button"
            className="vps-drawer-close"
            onClick={closeMenu}
            aria-label="Close menu"
            tabIndex={menuOpen ? 0 : -1}
          >
            <MenuIcon open />
          </button>
        </div>

        <nav className="vps-mobile-links" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `vps-mobile-link ${isActive ? "is-active" : ""}`
              }
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span className="vps-mobile-label">{item.label}</span>
              <span className="vps-mobile-arrow" aria-hidden="true">
                →
              </span>
            </NavLink>
          ))}

          <NavLink
            to="/admissions"
            className="vps-mobile-apply"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            Apply Now <span aria-hidden="true">↗</span>
          </NavLink>
        </nav>

        <div className="vps-drawer-footer">
          <p>Learning · Growth · Success</p>

          <div className="vps-drawer-socials">
            {["instagram", "facebook", "youtube"].map((social) => (
              <a
                key={social}
                href={SCHOOL_INFO[social] || undefined}
                target="_blank"
                rel="noreferrer"
                aria-label={social}
                onClick={
                  !SCHOOL_INFO[social]
                    ? (event) => event.preventDefault()
                    : undefined
                }
                tabIndex={menuOpen ? 0 : -1}
              >
                <SocialIcon type={social} />
              </a>
            ))}
          </div>
        </div>
      </aside>
    </header>
  );
}
