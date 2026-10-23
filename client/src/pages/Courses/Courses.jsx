
import { Link } from "react-router-dom";
import "./Courses.css";

const photos = {
  hero: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=85",
  classroom: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=85",
  books: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=85",
  science: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=85",
  commerce: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85",
  arts: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1000&q=85",
};

const classes = [
  { name: "Nursery", level: "Early Years" },
  { name: "LKG", level: "Early Years" },
  { name: "UKG", level: "Early Years" },
  ...Array.from({ length: 12 }, (_, i) => ({
    name: `Class ${i + 1}`,
    level:
      i + 1 <= 5
        ? "Primary School"
        : i + 1 <= 8
          ? "Middle School"
          : i + 1 <= 10
            ? "Secondary School"
            : "Senior Secondary",
  })),
];

const stages = [
  {
    number: "01",
    title: "Early Years",
    range: "Nursery – UKG",
    description:
      "A joyful beginning with foundational learning, communication, creativity and confidence.",
    icon: "✦",
  },
  {
    number: "02",
    title: "Primary School",
    range: "Classes 1 – 5",
    description:
      "Strong foundations in languages, mathematics, environmental studies and essential skills.",
    icon: "✎",
  },
  {
    number: "03",
    title: "Middle School",
    range: "Classes 6 – 8",
    description:
      "Expanding subject knowledge, independent thinking, curiosity and problem-solving.",
    icon: "⌘",
  },
  {
    number: "04",
    title: "Secondary School",
    range: "Classes 9 – 10",
    description:
      "Deeper subject understanding and preparation for important academic milestones.",
    icon: "◎",
  },
];

const streams = [
  {
    name: "Science",
    subtitle: "Explore the world through science",
    image: photos.science,
    icon: "⚗",
    description:
      "For students interested in scientific discovery, technology, healthcare, engineering and analytical problem-solving.",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "Computer Science"],
    theme: "science",
  },
  {
    name: "Commerce",
    subtitle: "Understand business and finance",
    image: photos.commerce,
    icon: "▥",
    description:
      "For students interested in business, accounts, economics, financial systems and entrepreneurship.",
    subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics", "Entrepreneurship"],
    theme: "commerce",
  },
  {
    name: "Arts / Humanities",
    subtitle: "Discover people, culture and society",
    image: photos.arts,
    icon: "✎",
    description:
      "For students interested in society, history, culture, public affairs, languages and human behaviour.",
    subjects: ["History", "Political Science", "Geography", "Sociology", "Psychology"],
    theme: "arts",
  },
];

function SectionHeading({ eyebrow, title, accent, description }) {
  return (
    <div className="course-section-heading">
      <span className="course-eyebrow">{eyebrow}</span>
      <h2>
        {title} <span>{accent}</span>
      </h2>
      {description && <p>{description}</p>}
    </div>
  );
}

// School timetable: Session 2026–27
// Rows are classes; columns are periods I–VIII.
const timetable = [
  {
    className: "X",
    periods: [
      ["S.STD", "PS"], ["MATHS", "TM"], ["HINDI", "RM"],
      ["SKT/URDU", "MS/MB"], ["SCIE", "N.T"], ["SCI/S.STD", "NT/PS"],
      ["HED/GAMES", "AC/VS"], ["ENG", "RS"],
    ],
  },
  {
    className: "IX",
    periods: [
      ["MATHS", "TM"], ["S.STD", "PS"], ["ENG", "RS"],
      ["HINDI", "RM"], ["SKT/URDU", "MS/MB"], ["S.STD/SCI", "PS/NT"],
      ["SCI", "NT"], ["GAMES/HED", "VS/AC"],
    ],
  },
  {
    className: "VIII",
    periods: [
      ["ENG", "RS"], ["HINDI", "RM"], ["MATHS", "TM"],
      ["S.STD", "PS"], ["HED/GAMES", "AC/VS"], ["SKT/URDU", "MS/MB"],
      ["SCI", "NR"], ["G.K/COMP", "SR/MB"],
    ],
  },
  {
    className: "VII",
    periods: [
      ["HINDI", "RM"], ["ENG", "RS"], ["G.K/COMP", "SR/MB"],
      ["MATHS", "SS"], ["GAMES/HED", "VS/AC"], ["SCI", "NR"],
      ["S.STD", "PS"], ["COMP/G.K", "MB/SR"],
    ],
  },
  {
    className: "VI",
    periods: [
      ["SKT/URDU", "MS/MB"], ["MATHS", "SS"], ["S.STD", "PS"],
      ["ENG", "RS"], ["SCI", "NR"], ["HED/GAMES", "AC/VS"],
      ["G.K/COMP", "PM/MB"], ["HINDI", "RM"],
    ],
  },
  {
    className: "V",
    periods: [
      ["EVS", "PM"], ["EVS", "PM"], ["MATHS", "SS"],
      ["HED/GAMES", "AC/VS"], ["ENG", "RS"], ["HINDI", "RM"],
      ["COMP/G.K", "MB/SS"], ["SKT.", "MS"],
    ],
  },
  {
    className: "IV",
    periods: [
      ["SCI", "NR"], ["SKT./G.K", "MS/NR"], ["COMP/HED", "MB/AC"],
      ["S.STD", "PS"], ["MATHS", "SS"], ["ENG", "RS"],
      ["HINDI", "RM"], ["GAMES", "VS"],
    ],
  },
  {
    className: "III",
    periods: [
      ["HED/COMP", "AC/MB"], ["G.K/SKT", "NR/MS"], ["S.STD", "PS"],
      ["SCI", "NR"], ["HINDI", "PM"], ["MATHS", "SS"],
      ["ENG", "SP"], ["GAMES", "VS"],
    ],
  },
  {
    className: "II",
    periods: [
      ["ENG", "SP"], ["HED", "AC"], ["EVS", "SP"],
      ["HINDI", "SR"], ["GAMES", "VS"], ["G.K", "SP"],
      ["MATHS", "SR"], ["CT", ""],
    ],
  },
  {
    className: "I",
    periods: [
      ["MATHS", "SR"], ["HED", "AC"], ["HINDI", "SR"],
      ["EVS", "SP"], ["G.K", "SR"], ["GAMES", "VS"],
      ["ENG", "SP"], ["CT", ""],
    ],
  },
];

export default function Courses() {
  return (
    <div className="courses-page">
      <section className="course-hero">
        <div className="course-hero-content">
          <span className="course-top-label">
            <span className="course-label-dot" />
            VIDYA BHARTI PUBLIC SCHOOL · SIKAR
          </span>

          <h1>
            Discover your
            <br />
            <span>learning journey.</span>
          </h1>

          <p>
            From the first school days in Nursery to the important choices
            of Class 11 and 12, every stage is a step towards a brighter future.
          </p>

          <div className="course-hero-buttons">
            <Link to="/admissions" className="course-button course-button-main">
              Explore Admissions <span>↗</span>
            </Link>
            <a href="#all-classes" className="course-button course-button-light">
              Explore Classes <span>↓</span>
            </a>
          </div>

          <div className="course-hero-foot">
            <span className="course-hero-foot-icon">✦</span>
            <div>
              <strong>Education for Life</strong>
              <small>Knowledge · Values · Growth</small>
            </div>
          </div>
        </div>

        <div className="course-hero-picture">
          <img src={photos.hero} alt="Students learning together" />
          <div className="course-image-caption">
            <span>LEARN TODAY</span>
            <strong>Lead tomorrow.</strong>
          </div>
          <div className="course-floating-note">
            <span>✧</span>
            <div>
              <strong>Every child can grow</strong>
              <small>One step at a time</small>
            </div>
          </div>
          <div className="course-picture-decoration" />
        </div>
      </section>

      <section className="course-intro section-container">
        <div className="course-intro-image">
          <img src={photos.classroom} alt="Students in a classroom" loading="lazy" />
          <div className="course-image-stamp">
            <span>✦</span>
            <strong>Learn</strong>
            <strong>Explore</strong>
            <strong>Achieve</strong>
          </div>
        </div>

        <div className="course-intro-copy">
          <span className="course-eyebrow">A JOURNEY FOR EVERY LEARNER</span>
          <h2>
            Learning that grows
            <span> with your child.</span>
          </h2>
          <p>
            Every age brings new questions, discoveries and opportunities.
            Our academic journey is organised to help learners progress from
            foundational skills to subject-focused senior secondary education.
          </p>

          <div className="course-intro-points">
            <div>
              <span>✓</span>
              <p>
                <strong>Strong foundations</strong>
                <small>Build essential skills from the early years.</small>
              </p>
            </div>
            <div>
              <span>✓</span>
              <p>
                <strong>Learning by exploring</strong>
                <small>Develop curiosity, confidence and understanding.</small>
              </p>
            </div>
            <div>
              <span>✓</span>
              <p>
                <strong>Choices for the future</strong>
                <small>Explore academic pathways for Classes 11 and 12.</small>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="course-stages">
        <div className="section-container">
          <SectionHeading
            eyebrow="OUR ACADEMIC JOURNEY"
            title="A pathway for"
            accent="every stage."
            description="Explore the different stages of school education, from early childhood to board classes."
          />

          <div className="course-stage-grid">
            {stages.map((stage) => (
              <article className="course-stage-card" key={stage.number}>
                <div className="course-stage-top">
                  <span className="course-stage-icon">{stage.icon}</span>
                  <span className="course-stage-number">{stage.number}</span>
                </div>
                <h3>{stage.title}</h3>
                <span className="course-stage-range">{stage.range}</span>
                <p>{stage.description}</p>
                <a href="#all-classes" className="course-small-link">
                  View classes <span>↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="course-classes section-container" id="all-classes">
        <div className="course-class-heading-row">
          <SectionHeading
            eyebrow="NURSERY TO CLASS XII"
            title="Find your"
            accent="class."
            description="Choose a class to explore the academic stages offered on this page."
          />
          <div className="course-class-total">
            <strong>15</strong>
            <span>class levels</span>
          </div>
        </div>

        <div className="course-class-grid">
          {classes.map((schoolClass, index) => (
            <article className="course-class-card" key={schoolClass.name}>
              <span className="course-class-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="course-class-details">
                <h3>{schoolClass.name}</h3>
                <p>{schoolClass.level}</p>
              </div>
              <span className="course-class-arrow">↗</span>
            </article>
          ))}
        </div>

        <p className="course-small-note">
          For class availability, admission criteria and the current academic
          session, please contact the school office.
        </p>
      </section>

      {/* CLASS-WISE TIMETABLE */}
      <section className="course-timetable-section" id="class-timetable">
        <div className="section-container">
          <div className="course-timetable-heading">
            <span className="course-eyebrow">ACADEMIC SESSION 2026–27</span>
            <h2>
              Class-wise <span>Time Table</span>
            </h2>
            <p>Vidya Bharti Public School, Civil Lines, Sikar</p>
          </div>

          <div className="course-timetable-table-wrap">
            <table className="course-timetable-table">
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>Class</th>
                  {["I", "II", "III", "IV", "V", "VI", "VII", "VIII"].map(
                    (period) => (
                      <th key={period}>{period}</th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {timetable.map((row, index) => (
                  <tr key={row.className}>
                    <td>{String(index + 1).padStart(2, "0")}</td>
                    <th>{row.className}</th>
                    {row.periods.map(([subject, teacher], periodIndex) => (
                      <td key={`${row.className}-${periodIndex}`}>
                        <span className="course-timetable-subject-line">
                          {subject}
                        </span>
                        {teacher && (
                          <span className="course-timetable-subject-line">
                            {teacher}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="course-timetable-note">
            Class-wise timetable for the academic session 2026–27.
            Please contact the school office if you need clarification
            about any abbreviation.
          </p>
        </div>
      </section>

      <section className="course-senior">
        <div className="section-container">
          <div className="course-senior-intro">
            <div>
              <span className="course-eyebrow">CLASSES XI & XII</span>
              <h2>
                Your interests.
                <br />
                <span>Your future.</span>
              </h2>
            </div>
            <p>
              Senior secondary education is an important time to explore
              interests and prepare for higher studies. Discover Science,
              Commerce and Arts/Humanities pathways.
            </p>
          </div>

          <div className="course-stream-grid">
            {streams.map((stream, index) => (
              <article
                className={`course-stream-card course-stream-${stream.theme}`}
                key={stream.name}
              >
                <div className="course-stream-image">
                  <img
                    src={stream.image}
                    alt={`${stream.name} learning`}
                    loading="lazy"
                  />
                  <span className="course-stream-image-icon">{stream.icon}</span>
                  <span className="course-stream-number">0{index + 1}</span>
                </div>

                <div className="course-stream-body">
                  <span className="course-stream-kicker">{stream.subtitle}</span>
                  <h3>{stream.name}</h3>
                  <p>{stream.description}</p>
                  <span className="course-subject-label">SUBJECT EXAMPLES</span>
                  <div className="course-subject-list">
                    {stream.subjects.map((subject) => (
                      <span key={subject}>{subject}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="course-stream-disclaimer">
            Subject combinations shown are examples, not a confirmed VPS School
            subject list. Actual subjects and combinations depend on the
            school's approved offering and applicable RBSE rules. Please
            confirm availability with the school before admission.
          </p>
        </div>
      </section>

      <section className="course-learning section-container">
        <div className="course-learning-copy">
          <span className="course-eyebrow">BEYOND THE CLASSROOM</span>
          <h2>
            Education is more than
            <span> textbooks.</span>
          </h2>
          <p>
            A meaningful school experience helps children develop knowledge,
            communication, creativity, responsibility and the confidence to
            take on new challenges.
          </p>
          <Link to="/about" className="course-button course-button-main">
            Discover Our School <span>↗</span>
          </Link>
        </div>

        <div className="course-learning-image">
          <img src={photos.books} alt="Books in a library" loading="lazy" />
          <div className="course-learning-image-label">
            <span>✦</span>
            <div>
              <strong>Curiosity opens doors.</strong>
              <small>Keep learning. Keep growing.</small>
            </div>
          </div>
        </div>
      </section>

      <section className="course-cta">
        <div className="course-cta-decoration course-cta-decoration-one" />
        <div className="course-cta-decoration course-cta-decoration-two" />

        <div className="course-cta-inner">
          <span className="course-cta-kicker">THE NEXT STEP STARTS HERE</span>
          <h2>
            Ready to begin a
            <br />
            <span>brighter journey?</span>
          </h2>
          <p>
            Connect with VPS School to learn about admissions, classes and
            academic options.
          </p>

          <div className="course-hero-buttons course-cta-buttons">
            <Link to="/admissions" className="course-button course-button-white">
              Apply for Admission <span>↗</span>
            </Link>
            <Link to="/contact" className="course-button course-button-outline">
              Contact the School
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
