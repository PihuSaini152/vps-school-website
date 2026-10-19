
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <main className="vb-home">
      <section className="vb-hero">
        <img
          className="vb-hero-image"
          src="/Home/Home.jpg"
          alt="Vidya Bharti Public School campus"
        />

        <div className="vb-hero-overlay" />

        <div className="vb-hero-container">
          <div className="vb-hero-content">
            <span className="vb-eyebrow">
              WELCOME TO VIDYA BHARTI
            </span>

            <h1>
              VIDYA BHARTI
              <span>PUBLIC SCHOOL</span>
            </h1>

            <h2>RBSE Senior Secondary School</h2>

            <div className="vb-accent">
              <span />
              <span />
              <span />
            </div>

            <p className="vb-description">
              Inspiring young minds through quality education,
              strong values, and a passion for learning. Our aim
              is to help every student develop knowledge, confidence,
              discipline, and the skills needed for a bright future.
            </p>

            <p className="vb-board">
              <span className="vb-board-dot">✦</span>
              Rajasthan Board of Secondary Education (RBSE)
            </p>

            <div className="vb-buttons">
              <Link to="/admissions" className="vb-btn vb-btn-admission">
                <span>Admission Form</span>
                <span className="vb-btn-arrow">→</span>
              </Link>

              <Link to="/contact" className="vb-btn vb-btn-contact">
                <span>Contact Us</span>
                <span className="vb-btn-arrow">↗</span>
              </Link>
            </div>

            <div className="vb-tagline">
              LEARNING <span>•</span> GROWTH <span>•</span> SUCCESS
            </div>
          </div>
        </div>

        <div className="vb-color-strip">
          <span />
          <span />
          <span />
        </div>
      </section>
    </main>
  );
}
