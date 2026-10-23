
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./About.css";

const schoolSlides = [
  {
    title: "Our School Community",
    subtitle: "Growing Together, Achieving Together",
    image: "/About/school-group.jpg",
  },
  {
    title: "Learning Beyond Classrooms",
    subtitle: "Every Experience Builds Confidence",
    image: "/About/school-program.jpg",
  },
  {
    title: "A Campus Full of Possibilities",
    subtitle: "Inspiring Young Minds Every Day",
    image: "/About/school-building.jpg",
  },
];

const leadership = [
  {
    role: "Chairman",
    name: "Dr. Balwant Singh Chirana",
    image: "/About/Chairmen.jpg",
    message:
      "Our vision is to provide students with quality education and an environment that encourages them to become responsible, confident and thoughtful individuals. Together, we can help shape a better tomorrow.",
  },
  {
    role: "Director ",
    name: "Mrs. Dheeraj Kanwar",
    image: "/About/Diractor.jpg",
    message:
      "We want every school day to be a meaningful and enjoyable experience for children. Learning should inspire curiosity, reduce unnecessary stress and help each student discover their abilities. We look forward to working with parents to support every child's growth.",
  },
  {
    role: "School Management Coordinator",
    name: "Avya Singh Chirana",
    image: "/About/Manger.jpg",
    message:
      "A strong school community grows through cooperation, encouragement and a shared commitment to students. Our aim is to support a positive learning environment where children can develop knowledge, confidence and good values.",
  },
];

const reasons = [
  {
    number: "01",
    icon: "✦",
    title: "Education with Purpose",
    text: "Encouraging curiosity, understanding and a genuine interest in learning.",
  },
  {
    number: "02",
    icon: "♡",
    title: "Values and Character",
    text: "Promoting respect, discipline, honesty and responsibility in everyday life.",
  },
  {
    number: "03",
    icon: "↗",
    title: "Confidence and Growth",
    text: "Helping students express ideas, discover strengths and build self-confidence.",
  },
  {
    number: "04",
    icon: "◎",
    title: "Holistic Development",
    text: "Supporting academic progress alongside creativity, teamwork and personal growth.",
  },
  {
    number: "05",
    icon: "◇",
    title: "A Caring Environment",
    text: "Encouraging students to learn, participate and develop at their own pace.",
  },
  {
    number: "06",
    icon: "☀",
    title: "A Brighter Tomorrow",
    text: "Preparing young minds with knowledge, values and skills for the future.",
  },
];

function SectionHeading({ eyebrow, title, highlight, description }) {
  return (
    <div className="vb-about-heading">
      <span className="vb-about-eyebrow">{eyebrow}</span>
      <h2>
        {title} <span>{highlight}</span>
      </h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export default function About() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % schoolSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const showPrevious = () => {
    setActiveSlide(
      (current) => (current - 1 + schoolSlides.length) % schoolSlides.length
    );
  };

  const showNext = () => {
    setActiveSlide((current) => (current + 1) % schoolSlides.length);
  };

  return (
    <main className="vb-about-page">
      {/* TOP AUTOMATIC IMAGE SLIDER */}
      <section className="vb-about-slider" aria-label="School image gallery">
        {schoolSlides.map((slide, index) => (
          <div
            key={slide.title}
            className={`vb-about-slide ${
              activeSlide === index ? "is-active" : ""
            }`}
            aria-hidden={activeSlide !== index}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="vb-about-slide-image"
              fetchPriority={index === 0 ? "high" : "auto"}
              onError={(event) => {
                event.currentTarget.style.visibility = "hidden";
              }}
            />

            <div className="vb-about-slide-shade" />

            <div className="vb-about-slide-caption">
              <span>VIDYA BHARATI PUBLIC SCHOOL</span>
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <Link to="/admissions" className="vb-about-slider-cta">
                Explore Admissions <span>↗</span>
              </Link>
            </div>
          </div>
        ))}

        <div className="vb-about-slider-controls">
          <button
            type="button"
            className="vb-slider-arrow"
            onClick={showPrevious}
            aria-label="Previous image"
          >
            ‹
          </button>

          <div className="vb-about-dots">
            {schoolSlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                className={`vb-about-dot ${
                  activeSlide === index ? "is-active" : ""
                }`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Show slide ${index + 1}`}
                aria-pressed={activeSlide === index}
              />
            ))}
          </div>

          <button
            type="button"
            className="vb-slider-arrow"
            onClick={showNext}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      </section>

      {/* SCHOOL INTRODUCTION */}
      <section className="vb-about-intro vb-about-section">
        <div className="vb-about-intro-copy">
          <span className="vb-about-eyebrow">GET TO KNOW US</span>
          <h2>
            Welcome to <span>Vidya Bharati Public School</span>
          </h2>

          <p className="vb-about-lead">
            Education for Life — nurturing knowledge, values and the potential
            of every learner.
          </p>

          <p>
            At Vidya Bharati Public School, our aim is to create a positive
            learning environment where students can develop their abilities,
            strengthen their character and prepare for the opportunities and
            responsibilities of tomorrow.
          </p>

          <p>
            We believe that education goes beyond textbooks. It should inspire
            curiosity, encourage independent thinking and help children grow
            into confident and responsible individuals.
          </p>

          <div className="vb-about-intro-actions">
            <Link to="/admissions" className="vb-about-btn vb-about-btn-primary">
              Admissions <span>↗</span>
            </Link>
            <Link to="/contact" className="vb-about-text-link">
              Contact Our School →
            </Link>
          </div>
        </div>

        <div className="vb-about-motto-card">
          <div className="vb-motto-decoration">✦</div>
          <span>OUR MOTTO</span>
          <h3>Education for Life</h3>
          <p>Ultimately, the union of the soul with the Almighty.</p>
          <div className="vb-motto-rule" />
          <small>Knowledge · Values · Growth</small>
        </div>
      </section>

      {/* VISION AND MISSION */}
      <section className="vb-about-purpose">
        <div className="vb-about-purpose-inner">
          <SectionHeading
            eyebrow="OUR GUIDING PRINCIPLES"
            title="Education for"
            highlight="Life"
            description="The vision and mission that guide our approach to education."
          />

          <div className="vb-purpose-grid">
            <article className="vb-purpose-card vb-purpose-vision">
              <div className="vb-purpose-icon">◎</div>
              <span className="vb-purpose-label">OUR VISION</span>
              <h3>Creating a Better Society</h3>
              <p>
                To create an egalitarian society rooted in Indian values,
                guided by humanistic thought, enriched by modern knowledge,
                and strengthened through technical awareness and self-reliance.
              </p>
            </article>

            <article className="vb-purpose-card vb-purpose-mission">
              <div className="vb-purpose-icon">✧</div>
              <span className="vb-purpose-label">OUR MISSION</span>
              <h3>Helping Every Student Excel</h3>
              <p>
                To provide a conducive environment for the holistic development
                of every individual, nurturing a healthy competitive spirit,
                an unquenchable thirst for knowledge and the pursuit of
                excellence in every endeavour.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* LEADERSHIP MESSAGES WITH PHOTOS */}
      <section className="vb-about-leadership vb-about-section">
        <SectionHeading
          eyebrow="LEADERSHIP AND GUIDANCE"
          title="Messages from"
          highlight="Our Leaders"
          description="A shared commitment to learning, values and the future of every student."
        />

        <div className="vb-leadership-list">
          {leadership.map((person, index) => (
            <article
              key={person.role}
              className={`vb-leader-card ${
                index % 2 === 1 ? "vb-leader-reverse" : ""
              }`}
            >
              <div className="vb-leader-message">
                <span className="vb-leader-quote-mark" aria-hidden="true">
                  “
                </span>
                <span className="vb-about-eyebrow">{person.role}</span>
                <h3>{person.name}</h3>
                <p>{person.message}</p>
                <div className="vb-leader-signature">
                  <span />
                  <small>{person.role}</small>
                </div>
              </div>

              <div className="vb-leader-photo-wrap">
                <img
                  src={person.image}
                  alt={`${person.name} - ${person.role}`}
                  className="vb-leader-photo"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.visibility = "hidden";
                  }}
                />
                <div className="vb-leader-photo-label">
                  <span>VIDYA BHARATI PUBLIC SCHOOL</span>
                  <strong>{person.role}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE VPS */}
      <section className="vb-about-why">
        <div className="vb-about-why-inner">
          <SectionHeading
            eyebrow="THE VPS DIFFERENCE"
            title="More Than Education,"
            highlight="A Foundation for Life"
            description="We aim to help every child learn, discover their strengths and build a confident future."
          />

          <div className="vb-why-grid">
            {reasons.map((reason) => (
              <article className="vb-why-card" key={reason.number}>
                <span className="vb-why-number">{reason.number}</span>
                <div className="vb-why-icon">{reason.icon}</div>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </article>
            ))}
          </div>

          <div className="vb-why-bottom">
            <span className="vb-why-bottom-icon">✦</span>
            <div>
              <strong>Every child has the potential to shine.</strong>
              <p>
                Together, we nurture knowledge, values and confidence for a
                brighter tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING BANNER */}
      <section className="vb-about-closing">
        <div className="vb-about-closing-content">
          <span>VIDYA BHARATI PUBLIC SCHOOL</span>
          <h2>Shaping Better Tomorrows</h2>
          <p>
            Education for Life — empowering young minds through knowledge,
            values and continuous growth.
          </p>

          <div className="vb-about-closing-actions">
            <Link to="/admissions" className="vb-about-btn vb-about-btn-light">
              Explore Admissions ↗
            </Link>
            <Link to="/contact" className="vb-about-closing-link">
              Get in Touch →
            </Link>
          </div>
        </div>

        <div className="vb-closing-orb vb-closing-orb-one" />
        <div className="vb-closing-orb vb-closing-orb-two" />
      </section>
    </main>
  );
}
