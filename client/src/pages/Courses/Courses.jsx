import { Link } from "react-router-dom";
import "./Courses.css";

const photos = {
  hero: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=85",
  classroom:
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=85",
  books: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=85",
  science:
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=85",
  commerce:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85",
  arts: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1000&q=85",
};

const classes = [
  { name: "Nursery", level: "Early Years" },
  { name: "KG Prep", level: "Kindergarten" },
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
    range: "Nursery",
    description:
      "A joyful beginning with foundational learning, communication, creativity and confidence.",
    icon: "✦",
  },
  {
    number: "02",
    title: "Kindergarten",
    range: "KG Prep",
    description:
      "Play-based learning that encourages language development, early mathematics, creativity and social skills.",
    icon: "✎",
  },
  {
    number: "03",
    title: "Primary School",
    range: "Classes 1 – 5",
    description:
      "Building strong foundations in languages, mathematics, environmental studies and essential life skills.",
    icon: "⌘",
  },
  {
    number: "04",
    title: "Middle School",
    range: "Classes 6 – 8",
    description:
      "Developing subject knowledge, independent thinking, curiosity and problem-solving skills.",
    icon: "◎",
  },
  {
    number: "05",
    title: "Secondary School",
    range: "Classes 9 – 10",
    description:
      "Strengthening subject knowledge and preparing students for important academic milestones.",
    icon: "▤",
  },
  {
    number: "06",
    title: "Senior Secondary",
    range: "Classes 11 – 12",
    description:
      "Exploring academic interests and preparing for higher education and future career opportunities.",
    icon: "✧",
  },
];

const earlyYearsSubjects = [
  "English",
  "Hindi",
  "Mathematics",
  "Rhymes",
  "Conversation",
  "General Knowledge",
  "Art & Craft",
  "Activities",
  "Physical Training (PT)",
  "Music & Dance",
];

const primarySubjects = [
  "English",
  "Hindi",
  "Mathematics",
  "Environmental Studies (EVS)",
  "General Knowledge",
  "Computer",
  "Sanskrit / Urdu",
  "Social Studies",
  "Science",
];

const middleSubjects = [
  "English",
  "Hindi",
  "Mathematics",
  "Science",
  "Social Studies",
  "General Knowledge",
  "Computer",
  "Sanskrit / Urdu",
];

const secondarySubjects = [
  "Hindi",
  "English",
  "Mathematics",
  "Science",
  "Social Science",
  "Sanskrit / Urdu",
  "Holistic Education",
];

const seniorSubjects = [
  {
    name: "Science",
    subtitle: "Explore the world through science",
    image: photos.science,
    icon: "⚗",
    description:
      "For students interested in scientific discovery, technology, healthcare, engineering and analytical problem-solving.",
    subjects: [
      "Physics",
      "Chemistry",
      "Mathematics / Biology",
    ],
    theme: "science",
  },
  {
    name: "Commerce",
    subtitle: "Understand business and finance",
    image: photos.commerce,
    icon: "▥",
    description:
      "For students interested in business, accounts, economics, financial systems and entrepreneurship.",
    subjects: [
      "Accountancy",
      "Business Studies",
      "Economics",
    ],
    theme: "commerce",
  },
  {
    name: "Arts / Humanities",
    subtitle: "Discover people, culture and society",
    image: photos.arts,
    icon: "✎",
    description:
      "For students interested in society, history, culture, public affairs, languages and human behaviour.",
    subjects: [
      "History",
      "Political Science",
      "Geography",
    ],
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

function SubjectList({ subjects }) {
  return (
    <div className="course-subject-list">
      {subjects.map((subject) => (
        <span key={subject}>{subject}</span>
      ))}
    </div>
  );
}

export default function Courses() {
  return (
    <div className="courses-page">
      {/* HERO SECTION */}
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
            From Nursery and KG Prep to Classes XI and XII, every
            stage of learning helps students build knowledge,
            confidence, values and skills for a brighter future.
          </p>

          <div className="course-hero-buttons">
            <Link
              to="/admissions"
              className="course-button course-button-main"
            >
              Explore Admissions <span>↗</span>
            </Link>

            <a
              href="#all-classes"
              className="course-button course-button-light"
            >
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
          <img
            src={photos.hero}
            alt="Students learning together"
          />

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

      {/* INTRODUCTION */}
      <section className="course-intro section-container">
        <div className="course-intro-image">
          <img
            src={photos.classroom}
            alt="Students in a classroom"
            loading="lazy"
          />

          <div className="course-image-stamp">
            <span>✦</span>
            <strong>Learn</strong>
            <strong>Explore</strong>
            <strong>Achieve</strong>
          </div>
        </div>

        <div className="course-intro-copy">
          <span className="course-eyebrow">
            A JOURNEY FOR EVERY LEARNER
          </span>

          <h2>
            Learning that grows
            <span> with your child.</span>
          </h2>

          <p>
            Every age brings new questions, discoveries and
            opportunities. Our academic journey supports children
            from their first learning experiences to advanced
            school education.
          </p>

          <div className="course-intro-points">
            <div>
              <span>✓</span>
              <p>
                <strong>Strong foundations</strong>
                <small>
                  Build essential skills from the early years.
                </small>
              </p>
            </div>

            <div>
              <span>✓</span>
              <p>
                <strong>Holistic Education</strong>
                <small>
                  Encourage academic, creative, physical and
                  personal development.
                </small>
              </p>
            </div>

            <div>
              <span>✓</span>
              <p>
                <strong>Choices for the future</strong>
                <small>
                  Explore academic pathways for Classes XI and XII.
                </small>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMIC STAGES */}
      <section className="course-stages">
        <div className="section-container">
          <SectionHeading
            eyebrow="OUR ACADEMIC JOURNEY"
            title="A pathway for"
            accent="every stage."
            description="Explore the different stages of school education, from Nursery to senior secondary classes."
          />

          <div className="course-stage-grid">
            {stages.map((stage) => (
              <article
                className="course-stage-card"
                key={stage.number}
              >
                <div className="course-stage-top">
                  <span className="course-stage-icon">
                    {stage.icon}
                  </span>

                  <span className="course-stage-number">
                    {stage.number}
                  </span>
                </div>

                <h3>{stage.title}</h3>

                <span className="course-stage-range">
                  {stage.range}
                </span>

                <p>{stage.description}</p>

                <a
                  href="#all-classes"
                  className="course-small-link"
                >
                  View classes <span>↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ALL CLASSES */}
      <section
        className="course-classes section-container"
        id="all-classes"
      >
        <div className="course-class-heading-row">
          <SectionHeading
            eyebrow="NURSERY TO CLASS XII"
            title="Find your"
            accent="class."
            description="Explore the classes and academic stages available on this page."
          />

          <div className="course-class-total">
            <strong>{classes.length}</strong>
            <span>class levels</span>
          </div>
        </div>

        <div className="course-class-grid">
          {classes.map((schoolClass, index) => (
            <article
              className="course-class-card"
              key={schoolClass.name}
            >
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
          For class availability, admission criteria and the
          current academic session, please contact the school office.
        </p>
      </section>

      {/* EARLY YEARS */}
      <section className="course-stages">
        <div className="section-container">
          <SectionHeading
            eyebrow="FOUNDATIONAL LEARNING"
            title="Nursery &"
            accent="KG Prep."
            description="A joyful beginning that combines early academics, communication, creativity and engaging activities."
          />

          <div className="course-stream-grid">
            <article className="course-stream-card course-stream-science">
              <div className="course-stream-image">
                <img
                  src={photos.classroom}
                  alt="Young children learning in class"
                  loading="lazy"
                />

                <span className="course-stream-image-icon">
                  ✦
                </span>

                <span className="course-stream-number">01</span>
              </div>

              <div className="course-stream-body">
                <span className="course-stream-kicker">
                  FOUNDATIONAL STAGE
                </span>

                <h3>Nursery</h3>

                <p>
                  Early learning experiences designed to encourage
                  curiosity, communication, creativity and confidence.
                </p>

                <span className="course-subject-label">
                  LEARNING AREAS
                </span>

                <SubjectList subjects={earlyYearsSubjects} />
              </div>
            </article>

            <article className="course-stream-card course-stream-commerce">
              <div className="course-stream-image">
                <img
                  src={photos.books}
                  alt="Learning books for young students"
                  loading="lazy"
                />

                <span className="course-stream-image-icon">
                  ✎
                </span>

                <span className="course-stream-number">02</span>
              </div>

              <div className="course-stream-body">
                <span className="course-stream-kicker">
                  KINDERGARTEN
                </span>

                <h3>KG Prep</h3>

                <p>
                  Preparing young learners for school through
                  language, early mathematics, creativity,
                  interaction and enjoyable activities.
                </p>

                <span className="course-subject-label">
                  LEARNING AREAS
                </span>

                <SubjectList subjects={earlyYearsSubjects} />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CLASS-WISE SUBJECTS */}
      <section
        className="course-timetable-section"
        id="class-timetable"
      >
        <div className="section-container">
          <div className="course-timetable-heading">
            <span className="course-eyebrow">
              ACADEMIC SESSION 2026–27
            </span>

            <h2>
              Class-wise <span>Subjects</span>
            </h2>

            <p>Vidya Bharti Public School, Civil Lines, Sikar</p>
          </div>

          <div className="course-stream-grid">
            <article className="course-stream-card course-stream-science">
              <div className="course-stream-body">
                <span className="course-stream-kicker">
                  PRIMARY SCHOOL
                </span>

                <h3>Classes I–V</h3>

                <p>
                  Foundational academic subjects and essential
                  learning skills for primary students.
                </p>

                <span className="course-subject-label">
                  SUBJECT AREAS
                </span>

                <SubjectList subjects={primarySubjects} />
              </div>
            </article>

            <article className="course-stream-card course-stream-commerce">
              <div className="course-stream-body">
                <span className="course-stream-kicker">
                  MIDDLE SCHOOL
                </span>

                <h3>Classes VI–VIII</h3>

                <p>
                  A broader range of subjects to develop knowledge,
                  reasoning and independent learning.
                </p>

                <span className="course-subject-label">
                  SUBJECT AREAS
                </span>

                <SubjectList subjects={middleSubjects} />
              </div>
            </article>

            <article className="course-stream-card course-stream-arts">
              <div className="course-stream-body">
                <span className="course-stream-kicker">
                  SECONDARY SCHOOL
                </span>

                <h3>Classes IX–X</h3>

                <p>
                  Subject areas identified in the school's
                  shared examination schedule and client message.
                </p>

                <span className="course-subject-label">
                  SUBJECT AREAS
                </span>

                <SubjectList subjects={secondarySubjects} />
              </div>
            </article>
          </div>

          <p className="course-timetable-note">
            Subject information is based on the examination
            schedule and details shared by the school. Please
            confirm the final class-wise subject list with the
            school office before publishing it as an official
            curriculum.
          </p>
        </div>
      </section>

      {/* HOLISTIC EDUCATION */}
      <section className="course-learning section-container">
        <div className="course-learning-copy">
          <span className="course-eyebrow">
            LEARNING BEYOND TEXTBOOKS
          </span>

          <h2>
            Holistic
            <span> Education.</span>
          </h2>

          <p>
            Education is more than academic subjects. Holistic
            education encourages the overall development of
            students through creativity, communication,
            physical activities, values and personal growth.
          </p>

          <div className="course-intro-points">
            <div>
              <span>✓</span>
              <p>
                <strong>Creative Development</strong>
                <small>Art, craft, music and dance.</small>
              </p>
            </div>

            <div>
              <span>✓</span>
              <p>
                <strong>Physical Development</strong>
                <small>Physical training, games and activities.</small>
              </p>
            </div>

            <div>
              <span>✓</span>
              <p>
                <strong>Personal Development</strong>
                <small>Communication, confidence and values.</small>
              </p>
            </div>
          </div>
        </div>

        <div className="course-learning-image">
          <img
            src={photos.books}
            alt="Books in a library"
            loading="lazy"
          />

          <div className="course-learning-image-label">
            <span>✦</span>

            <div>
              <strong>Curiosity opens doors.</strong>
              <small>Keep learning. Keep growing.</small>
            </div>
          </div>
        </div>
      </section>

      {/* SENIOR SECONDARY */}
      <section className="course-senior">
        <div className="section-container">
          <div className="course-senior-intro">
            <div>
              <span className="course-eyebrow">
                CLASSES XI & XII
              </span>

              <h2>
                Your interests.
                <br />
                <span>Your future.</span>
              </h2>
            </div>

            <p>
              Senior secondary education is an important time
              to explore interests and prepare for higher studies.
              Learn about different academic pathways.
            </p>
          </div>

          <div className="course-stream-grid">
            {seniorSubjects.map((stream, index) => (
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

                  <span className="course-stream-image-icon">
                    {stream.icon}
                  </span>

                  <span className="course-stream-number">
                    0{index + 1}
                  </span>
                </div>

                <div className="course-stream-body">
                  <span className="course-stream-kicker">
                    {stream.subtitle}
                  </span>

                  <h3>{stream.name}</h3>

                  <p>{stream.description}</p>

                  <span className="course-subject-label">
                    EXAMPLE SUBJECTS
                  </span>

                  <SubjectList subjects={stream.subjects} />
                </div>
              </article>
            ))}
          </div>

          <p className="course-stream-disclaimer">
            Senior secondary streams and subject combinations
            are illustrative examples only. Actual availability
            must be confirmed with the school.
          </p>
        </div>
      </section>

      {/* LEARNING SECTION */}
      <section className="course-learning section-container">
        <div className="course-learning-copy">
          <span className="course-eyebrow">
            BEYOND THE CLASSROOM
          </span>

          <h2>
            Education is more than
            <span> textbooks.</span>
          </h2>

          <p>
            A meaningful school experience helps children develop
            knowledge, communication, creativity, responsibility
            and the confidence to take on new challenges.
          </p>

          <Link
            to="/about"
            className="course-button course-button-main"
          >
            Discover Our School <span>↗</span>
          </Link>
        </div>

        <div className="course-learning-image">
          <img
            src={photos.books}
            alt="Books in a library"
            loading="lazy"
          />

          <div className="course-learning-image-label">
            <span>✦</span>

            <div>
              <strong>Curiosity opens doors.</strong>
              <small>Keep learning. Keep growing.</small>
            </div>
          </div>
        </div>
      </section>

      {/* ADMISSION CTA */}
      <section className="course-cta">
        <div className="course-cta-decoration course-cta-decoration-one" />
        <div className="course-cta-decoration course-cta-decoration-two" />

        <div className="course-cta-inner">
          <span className="course-cta-kicker">
            THE NEXT STEP STARTS HERE
          </span>

          <h2>
            Ready to begin a
            <br />
            <span>brighter journey?</span>
          </h2>

          <p>
            Connect with VPS School to learn about admissions,
            classes and academic options.
          </p>

          <div className="course-hero-buttons course-cta-buttons">
            <Link
              to="/admissions"
              className="course-button course-button-white"
            >
              Apply for Admission <span>↗</span>
            </Link>

            <Link
              to="/contact"
              className="course-button course-button-outline"
            >
              Contact the School
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}