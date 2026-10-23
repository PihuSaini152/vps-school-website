import "./Contact.css";

const school = {
  name: "Vidya Bharati Public School",
  tagline: "Shaping Better Tomorrows",
  address:
    "Civil Lines, in front of Collector's Bunglow, Sikar, Rajasthan 332001, India",
  phones: ["8302977245", "9352812501"],
  email: "vbpssikar@gmail.com",
  photo: "/Contact/Herocard.jpg",
  map:
    "https://www.google.com/maps/place/Vidya+Bharati+Public+School+RBSE,+Civil+Lines+Campus/@27.6072845,75.1505661,17z/",
  mapEmbed:
    "https://www.google.com/maps?q=27.607281,75.1505617&z=17&output=embed",
  socials: [
    {
      name: "Instagram",
      url: "https://www.instagram.com/vbpssikar/",
      icon: "instagram",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/vpsrbse/",
      icon: "facebook",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@VbpsSikar",
      icon: "youtube",
    },
  ],
};

function SocialIcon({ type }) {
  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle className="social-icon-dot" cx="17.5" cy="6.5" r="1" />
      </svg>
    );
  }

  if (type === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          className="social-icon-fill"
          d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.8-4.67 4.54-4.67 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87V12h3.33l-.53 3.47h-2.8v8.38A12 12 0 0 0 24 12Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        className="social-icon-fill"
        d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"
      />
    </svg>
  );
}

function DetailIcon({ type }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (type === "location") {
    return (
      <svg {...common}>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg {...common}>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19a19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.8 2.1Z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export default function Contact() {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-orb contact-orb-one" />
        <div className="contact-hero-orb contact-orb-two" />

        <div className="contact-hero-content">
          <span className="contact-eyebrow">
            WE'RE HERE FOR YOU
          </span>

          <h1>
            Let's Stay
            <span>Connected.</span>
          </h1>

          <p>
            Every great journey begins with a conversation.
            Connect with our school for admissions, information
            and everything you need to know.
          </p>

          <div className="contact-hero-buttons">
            <a href="#school-details" className="contact-btn-primary">
              Contact Our School <span>↗</span>
            </a>

            <a href="#school-map" className="contact-btn-secondary">
              Explore Location
            </a>
          </div>

          <div className="contact-hero-note">
            <span />
            Shaping Better Tomorrows
          </div>
        </div>

        <div className="contact-hero-art" aria-hidden="true">
          <div className="contact-art-ring ring-outer" />
          <div className="contact-art-ring ring-inner" />

          <div className="contact-art-card contact-school-photo">
            <img
              src={school.photo}
              alt="Vidya Bharati Public School campus, Sikar"
            />

            <div className="contact-photo-caption">
              <span>WELCOME TO VPS</span>
              <h2>Where brighter futures begin.</h2>
              <p>Vidya Bharati Public School · Sikar</p>
            </div>
          </div>

          <div className="contact-art-dot dot-top" />
          <div className="contact-art-dot dot-bottom" />
        </div>
      </section>

      <section className="contact-details-section" id="school-details">
        <div className="contact-section-heading">
          <span className="contact-section-label">GET IN TOUCH</span>
          <h2>We'd love to welcome you.</h2>
          <p>
            Find our campus, speak with our team or connect
            with us on social media.
          </p>
        </div>

        <div className="contact-details-grid">
          <article className="contact-detail-card">
            <div className="contact-detail-top">
              <div className="contact-detail-icon">
                <DetailIcon type="location" />
              </div>
              <span className="contact-card-number">01</span>
            </div>

            <span className="contact-card-label">FIND OUR CAMPUS</span>
            <h3>Visit Our School</h3>
            <p>{school.address}</p>

            <a
              className="contact-detail-link"
              href={school.map}
              target="_blank"
              rel="noreferrer"
            >
              Get directions <span>↗</span>
            </a>
          </article>

          <article className="contact-detail-card">
            <div className="contact-detail-top">
              <div className="contact-detail-icon">
                <DetailIcon type="phone" />
              </div>
              <span className="contact-card-number">02</span>
            </div>

            <span className="contact-card-label">LET'S TALK</span>
            <h3>Call Our School</h3>
            <p>
              Have a question? Our school team is happy to help.
            </p>

            <div className="contact-phone-list">
              {school.phones.map((phone) => (
                <a href={`tel:${phone}`} key={phone}>
                  <span>+91 {phone}</span>
                  <span className="contact-phone-arrow">↗</span>
                </a>
              ))}
            </div>
          </article>

          <article className="contact-detail-card">
            <div className="contact-detail-top">
              <div className="contact-detail-icon">
                <DetailIcon type="mail" />
              </div>
              <span className="contact-card-number">03</span>
            </div>

            <span className="contact-card-label">WRITE TO US</span>
            <h3>School Email</h3>
            <p>For admission enquiries and general information.</p>

            <a
              className="contact-detail-link contact-email-link"
              href={`mailto:${school.email}`}
            >
              {school.email} <span>↗</span>
            </a>
          </article>
        </div>
      </section>

      <section className="contact-social-section">
        <div className="contact-social-content">
          <div>
            <span className="contact-section-label">
              FOLLOW OUR JOURNEY
            </span>
            <h2>Stay connected with VPS.</h2>
            <p>
              Explore school activities, updates and moments
              from our learning community.
            </p>
          </div>

          <div className="contact-social-grid">
            {school.socials.map((social) => (
              <a
                href={social.url}
                key={social.name}
                target="_blank"
                rel="noreferrer"
                className={`contact-social-card social-${social.icon}`}
                aria-label={`Visit school ${social.name}`}
              >
                <span className="contact-social-icon">
                  <SocialIcon type={social.icon} />
                </span>

                <span className="contact-social-name">
                  {social.name}
                </span>

                <span className="contact-social-open">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-map-section" id="school-map">
        <div className="contact-map-heading">
          <div>
            <span className="contact-section-label">COME FIND US</span>
            <h2>Right here in Sikar.</h2>
            <p>
              Visit Vidya Bharati Public School, Civil Lines Campus.
            </p>
          </div>

          <a
            href={school.map}
            target="_blank"
            rel="noreferrer"
            className="contact-map-open"
          >
            Open in Google Maps <span>↗</span>
          </a>
        </div>

        <div className="contact-map-container">
          <iframe
            title="Vidya Bharati Public School, Civil Lines Campus, Sikar"
            src={school.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

          <div className="contact-map-overlay">
            <div className="contact-map-pin">
              <DetailIcon type="location" />
            </div>

            <div className="contact-map-text">
              <strong>{school.name}</strong>
              <span>Civil Lines Campus, Sikar, Rajasthan</span>
            </div>

            <a
              href={school.map}
              target="_blank"
              rel="noreferrer"
              aria-label="Open school map"
            >
              ↗
            </a>
          </div>
        </div>
      </section>

      <section className="contact-final-banner">
        <div className="contact-final-monogram" aria-hidden="true">
          VPS
        </div>

        <div className="contact-final-content">
          <span>VIDYA BHARATI PUBLIC SCHOOL</span>
          <h2>{school.tagline}</h2>
          <p>
            Nurturing knowledge, building confidence and
            inspiring every child to achieve more.
          </p>
        </div>

        <a href="/admissions">
          Explore Admissions <span>↗</span>
        </a>
      </section>
    </main>
  );
}
