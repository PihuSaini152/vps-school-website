
import { Link } from "react-router-dom";
import "./Home.css";

const dayScholarFees = [
  ["PG Nur. / KG / Prep", "₹11,000", "₹7,000", "₹7,000", "₹25,000"],
  ["Class I–II", "₹14,000", "₹9,000", "₹9,000", "₹32,000"],
  ["Class III–V", "₹15,000", "₹10,000", "₹10,000", "₹35,000"],
  ["Class VI–VIII", "₹16,000", "₹12,000", "₹12,000", "₹40,000"],
  ["Class IX", "₹18,000", "₹13,000", "₹13,000", "₹44,000"],
  ["Class X", "₹20,000", "₹15,000", "₹15,000", "₹50,000"],
  ["Class XI–XII Commerce", "₹21,000", "₹17,000", "₹17,000", "₹55,000"],
  ["Class XI–XII Science", "₹24,000", "₹18,000", "₹18,000", "₹60,000"],
];

const boarderFees = [
  ["Class VI–VIII", "₹51,000", "₹37,000", "₹37,000", "₹1,25,000"],
  ["Class IX", "₹57,000", "₹41,000", "₹41,000", "₹1,39,000"],
  ["Class X", "₹59,000", "₹43,000", "₹43,000", "₹1,45,000"],
  ["Class XI–XII Commerce", "₹68,000", "₹51,000", "₹51,000", "₹1,70,000"],
  ["Class XI–XII Science", "₹71,000", "₹52,000", "₹52,000", "₹1,75,000"],
];

const transportFees = [
  ["Below 5 km", "₹4,000", "₹4,000", "₹4,000", "₹12,000"],
  ["6–10 km", "₹5,000", "₹5,000", "₹5,000", "₹15,000"],
  ["11–15 km", "₹6,000", "₹6,000", "₹6,000", "₹18,000"],
  ["16 km and above", "₹7,000", "₹7,000", "₹7,000", "₹21,000"],
];

const programs = [
  {
    number: "01",
    icon: "✦",
    title: "Early Years",
    subtitle: "A joyful beginning",
    description:
      "A caring environment where young learners begin exploring, discovering and building confidence.",
    classes: "PG • Nursery • KG • Prep",
    color: "pink",
  },
  {
    number: "02",
    icon: "▤",
    title: "Primary School",
    subtitle: "Building strong foundations",
    description:
      "Developing essential skills, curiosity, creativity and a positive attitude towards learning.",
    classes: "Classes I–V",
    color: "teal",
  },
  {
    number: "03",
    icon: "✎",
    title: "Middle School",
    subtitle: "Learning with confidence",
    description:
      "Encouraging independent thinking, teamwork and a deeper understanding of academic subjects.",
    classes: "Classes VI–VIII",
    color: "gold",
  },
  {
    number: "04",
    icon: "◎",
    title: "Senior School",
    subtitle: "Preparing for tomorrow",
    description:
      "Supporting students as they strengthen subject knowledge and prepare for future academic goals.",
    classes: "Classes IX–XII",
    color: "blue",
  },
];

const highlights = [
  {
    icon: "✦",
    title: "Learning & Discovery",
    text: "Encouraging curiosity, creativity and a love of learning.",
  },
  {
    icon: "◎",
    title: "Values & Character",
    text: "Helping students grow with discipline, respect and responsibility.",
  },
  {
    icon: "↗",
    title: "Confidence & Growth",
    text: "Creating opportunities to develop skills and express ideas.",
  },
];

function FeeTable({ title, description, rows }) {
  return (
    <div className="vb-fee-card">
      <div className="vb-fee-card-heading">
        <div>
          <span className="vb-section-kicker">SESSION 2026–27</span>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <span className="vb-fee-card-icon">₹</span>
      </div>

      <div className="vb-table-scroll">
        <table className="vb-fee-table">
          <thead>
            <tr>
              <th>Class</th>
              <th>
                Installment 1
                <small>1–15 April 2026</small>
              </th>
              <th>
                Installment 2
                <small>1–10 September 2026</small>
              </th>
              <th>
                Installment 3
                <small>1–10 December 2026</small>
              </th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]}>
                <th scope="row">{row[0]}</th>
                {row.slice(1, 4).map((fee, index) => (
                  <td key={`${row[0]}-${index}`}>{fee}</td>
                ))}
                <td className="vb-fee-total">{row[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="vb-home">
      {/* HERO: existing image path and main content retained */}
      <section className="vb-hero">
        <img
          className="vb-hero-image"
          src="/Home/Home.jpg"
          alt="Vidya Bharti Public School campus"
        />

        <div className="vb-hero-overlay" />

        <div className="vb-hero-container">
          <div className="vb-hero-content">
            <span className="vb-eyebrow">WELCOME TO VIDYA BHARTI</span>

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
              Inspiring young minds through quality education, strong
              values, and a passion for learning. Our aim is to help every
              student develop knowledge, confidence, discipline, and the
              skills needed for a bright future.
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

      {/* SCHOOL INTRODUCTION */}
      <section className="vb-intro vb-section">
        <div className="vb-section-container vb-intro-grid">
          <div className="vb-intro-copy">
            <span className="vb-section-kicker">WELCOME TO OUR SCHOOL</span>
            <h2>
              Every child has the potential to
              <span> achieve something wonderful.</span>
            </h2>
            <p>
              At Vidya Bharti Public School, Todi Nagar, Sikar, we believe
              education is about more than textbooks. It is about developing
              knowledge, good values, confidence and the ability to face
              tomorrow with purpose.
            </p>
            <p>
              Our goal is to provide students with a supportive learning
              environment where they can discover their strengths and grow
              into thoughtful, capable individuals.
            </p>
            <Link to="/about" className="vb-text-link">
              Discover our school <span>↗</span>
            </Link>
          </div>

          <div className="vb-motto-card">
            <div className="vb-motto-decoration">✦</div>
            <span className="vb-section-kicker">OUR MOTTO</span>
            <h3>Education for Life</h3>
            <p>
              Nurturing knowledge, values and the potential of every learner.
            </p>
            <div className="vb-motto-line" />
            <strong>KNOWLEDGE · VALUES · GROWTH</strong>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="vb-highlights vb-section">
        <div className="vb-section-container">
          <div className="vb-section-heading">
            <span className="vb-section-kicker">THE VPS EXPERIENCE</span>
            <h2>A foundation for a <span>brighter future.</span></h2>
            <p>
              Helping students learn, grow and discover what they can become.
            </p>
          </div>

          <div className="vb-highlights-grid">
            {highlights.map((item, index) => (
              <article className="vb-highlight-card" key={item.title}>
                <span className="vb-highlight-number">
                  0{index + 1}
                </span>
                <div className="vb-highlight-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMIC PROGRAMS */}
      <section className="vb-programs vb-section">
        <div className="vb-section-container">
          <div className="vb-section-heading vb-heading-row">
            <div>
              <span className="vb-section-kicker">LEARNING PATHWAYS</span>
              <h2>Growing at every <span>stage.</span></h2>
              <p>
                Learning opportunities designed around students' changing
                needs as they progress through school.
              </p>
            </div>
            <Link to="/courses" className="vb-outline-link">
              Explore courses <span>↗</span>
            </Link>
          </div>

          <div className="vb-program-grid">
            {programs.map((program) => (
              <article
                className={`vb-program-card vb-program-${program.color}`}
                key={program.number}
              >
                <div className="vb-program-top">
                  <span className="vb-program-icon">{program.icon}</span>
                  <span className="vb-program-number">{program.number}</span>
                </div>
                <span className="vb-program-subtitle">{program.subtitle}</span>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <div className="vb-program-bottom">
                  <span>{program.classes}</span>
                  <Link to="/courses" aria-label={`Explore ${program.title}`}>
                    ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FEE STRUCTURE */}
      <section className="vb-fees vb-section" id="fee-structure">
        <div className="vb-section-container">
          <div className="vb-section-heading">
            <span className="vb-section-kicker">CLEAR & TRANSPARENT</span>
            <h2>Fee structure for <span>2026–27.</span></h2>
            <p>
              Review the school's published fee chart below. Amounts are
              shown in Indian rupees as provided by the school.
            </p>
          </div>

          <div className="vb-fee-notice">
            <span className="vb-fee-notice-icon">₹</span>
            <div>
              <strong>Plan your academic year</strong>
              <p>
                Fees are divided into three installments. Conveyance charges
                are listed separately according to distance.
              </p>
            </div>
          </div>

          <FeeTable
            title="Fee Chart for Day Scholars"
            description="School fee by class"
            rows={dayScholarFees}
          />

          <FeeTable
            title="Fee Chart for Boarders"
            description="Boys & girls · School + Hostel"
            rows={boarderFees}
          />

          <FeeTable
            title="Annual Conveyance Charge"
            description="Annual transport charges by distance"
            rows={transportFees}
          />

          <div className="vb-fee-rules">
            <div className="vb-fee-rules-heading">
              <span className="vb-section-kicker">PLEASE NOTE</span>
              <h3>Fee rules & important information</h3>
            </div>
            <ul>
              <li>
                Admission fee for new students is ₹3,000.
              </li>
              <li>
                Conveyance fees are charged separately according to distance.
              </li>
              <li>
                If admission is withdrawn within 30 days, the admission fee
                plus 15% of the total fees will be deducted. The remaining
                refundable amount is returned by cheque only.
              </li>
              <li>
                After 30 days, fees are non-refundable, as stated in the
                school fee chart.
              </li>
            </ul>
            <p className="vb-fee-disclaimer">
              For confirmation of the applicable fee, payment dates, hostel
              details or any additional rules, please contact the school
              office.
            </p>
          </div>
        </div>
      </section>

      {/* ADMISSION CTA */}
      <section className="vb-admission-cta">
        <div className="vb-section-container vb-cta-inner">
          <div>
            <span className="vb-section-kicker">YOUR CHILD'S JOURNEY STARTS HERE</span>
            <h2>Let's shape a brighter tomorrow, together.</h2>
            <p>
              Connect with Vidya Bharti Public School for admission enquiries
              and further information.
            </p>
          </div>
          <div className="vb-cta-actions">
            <Link to="/admissions" className="vb-btn vb-btn-admission">
              Apply for Admission <span className="vb-btn-arrow">→</span>
            </Link>
            <a href="tel:8302977245" className="vb-cta-phone">
              Call: 8302977245
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
