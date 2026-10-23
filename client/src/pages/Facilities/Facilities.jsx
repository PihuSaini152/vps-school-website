
import "./Facilities.css";

const photos = {
  hero: "/Facilities/hero.jpg",
  classroom:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=85",
  computer:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85",
  holistic:
    "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=85",
  studio:
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=85",
  playground:
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=85",
};

const facilities = [
  {
    number: "01",
    title: "Computer Lab",
    category: "DIGITAL LEARNING",
    description:
      "A technology-enabled learning space where students develop digital literacy, computer skills and technological confidence for the future.",
    image: photos.computer,
    icon: "⌘",
    tone: "blue",
  },
  {
    number: "02",
    title: "Holistic Education Lab",
    category: "WHOLE-CHILD DEVELOPMENT",
    description:
      "A unique learning environment where students develop life skills, emotional intelligence, leadership, decision-making and self-awareness through engaging activities.",
    image: photos.holistic,
    icon: "✳",
    tone: "purple",
  },
  {
    number: "03",
    title: "Amazing Classroom Environment",
    category: "CLASSROOM LEARNING",
    description:
      "Bright, welcoming and student-friendly classrooms designed to inspire curiosity, encourage participation and make learning enjoyable.",
    image: photos.classroom,
    icon: "✦",
    tone: "pink",
  },
  {
    number: "04",
    title: "Digital Studio",
    category: "CREATIVE LEARNING",
    description:
      "A creative space that promotes communication, presentation skills, digital content creation and confidence in expressing ideas.",
    image: photos.studio,
    icon: "✎",
    tone: "gold",
  },
  {
    number: "05",
    title: "Playground",
    category: "SPORTS & ACTIVE PLAY",
    description:
      "A vibrant outdoor space where students develop physical fitness, teamwork, sportsmanship and discipline through sports and active play.",
    image: photos.playground,
    icon: "↗",
    tone: "green",
  },
];

const programs = [
  {
    image: "/Facilities/janmasthmi.jpg",
    title: "Janmashtami Celebration",
    category: "CULTURAL CELEBRATION",
    description:
      "Little students celebrating Janmashtami in traditional costumes.",
  },
  {
    image: "/Facilities/dance.jpg",
    title: "Mythological Characters",
    category: "CULTURAL PERFORMANCE",
    description:
      "Students participating in a traditional character presentation.",
  },
  {
    image: "/Facilities/student-presentation.jpg",
    title: "Student Presentation",
    category: "STUDENT PARTICIPATION",
    description:
      "A student confidently presenting an idea on stage.",
  },
  {
    image: "/Facilities/culture.jpg",
    title: "Cultural Performances",
    category: "CULTURAL ACTIVITIES",
    description:
      "Students showcasing their talent through performances.",
  },
  {
    image: "/Facilities/gkquix.jpg",
    title: "GK Quiz Activity",
    category: "KNOWLEDGE & LEARNING",
    description:
      "Students participating in a general knowledge quiz activity.",
  },
  {
    image: "/Facilities/studentsprice.jpg",
    title: "Achievement & Recognition",
    category: "SCHOOL CELEBRATION",
    description:
      "A special moment celebrating student participation and achievement.",
  },
  {
    image: "/Facilities/teachers.jpg",
    title: "Independence Day Activity",
    category: "NATIONAL CELEBRATION",
    description:
      "Students and school representatives celebrating Independence Day.",
  },
  {
    image: "/Facilities/prformance.jpg",
    title: "Patriotic Performances",
    category: "PATRIOTIC PROGRAMME",
    description:
      "Students presenting a patriotic performance on the school stage.",
  },
  {
    image: "/Facilities/studentsfood.jpg",
    title: "Creative Student Activities",
    category: "CREATIVITY",
    description:
      "Students taking part in a collaborative creative activity.",
  },
  {
    image: "/Facilities/jhasi.jpg",
    title: "Independence Day Celebration",
    category: "NATIONAL CELEBRATION",
    description:
      "A school display celebrating India's Independence Day.",
  },
  {
    image: "/Facilities/studentjpg.jpg",
    title: "Cultural Costume Activity",
    category: "CULTURAL DIVERSITY",
    description:
      "Students presenting different cultural characters and costumes.",
  },
  {
    image: "/Facilities/sports.jpg",
    title: "Sports Achievement",
    category: "SPORTS & TEAMWORK",
    description:
      "Students participating in a sports event and receiving recognition.",
  },
];

const highlights = [
  {
    number: "01",
    title: "Learn with Curiosity",
    text: "Encouraging questions, exploration and meaningful learning.",
    icon: "✦",
  },
  {
    number: "02",
    title: "Discover Your Talents",
    text: "Making room for creativity, participation and new interests.",
    icon: "✳",
  },
  {
    number: "03",
    title: "Grow with Confidence",
    text: "Supporting responsibility, teamwork and personal development.",
    icon: "♡",
  },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionHeading({ eyebrow, title, accent, description }) {
  return (
    <div className="facilities-section-heading">
      <span className="facilities-section-label">{eyebrow}</span>
      <h2>
        {title} <span>{accent}</span>
      </h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function FacilityCard({ item }) {
  return (
    <article className={`facility-card tone-${item.tone}`}>
      <div className="facility-card-visual">
        <img
          src={item.image}
          alt={item.title}
          className="facility-photo"
          loading="lazy"
        />
        <span className="facility-image-tag">
          {item.category}
        </span>
        <span className="facility-image-number">
          {item.number}
        </span>
      </div>

      <div className="facility-card-content">
        <div className="facility-card-icon" aria-hidden="true">
          {item.icon}
        </div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>

        <div className="facility-card-bottom">
          <span>Learning for life</span>
          <span className="facility-arrow">
            <ArrowIcon />
          </span>
        </div>
      </div>
    </article>
  );
}

function ProgramCard({ item }) {
  return (
    <article className="facilities-gallery-card">
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
      />

      <div className="gallery-card-overlay">
        <span className="gallery-category">
          {item.category}
        </span>
        <h3>{item.title}</h3>
        <p className="program-description">
          {item.description}
        </p>
        <span className="gallery-card-arrow">
          <ArrowIcon />
        </span>
      </div>
    </article>
  );
}

export default function Facilities() {
  return (
    <main className="facilities-page">
      {/* HERO */}
      <section className="facilities-hero">
        <div className="facilities-hero-decoration decoration-one" />
        <div className="facilities-hero-decoration decoration-two" />

        <div className="facilities-container facilities-hero-grid">
          <div className="facilities-hero-copy">
            <span className="facilities-eyebrow">
              <span className="eyebrow-line" />
              LEARNING · GROWTH · OPPORTUNITY
            </span>

            <h1>
              A place to learn.
              <br />
              <span>A future to inspire.</span>
            </h1>

            <p className="facilities-hero-description">
              Discover the learning spaces and opportunities
              at Vidya Bharti Public School. From digital learning
              and creative expression to physical activity, we
              encourage students to explore, participate and grow.
            </p>

            <div className="facilities-hero-actions">
              <a
                href="#school-facilities"
                className="facilities-primary-btn"
              >
                Explore Facilities <ArrowIcon />
              </a>

              <a href="/contact" className="facilities-text-btn">
                Contact Our School <span>↗</span>
              </a>
            </div>

            <div className="facilities-hero-note">
              <span className="hero-note-mark">✦</span>
              <span>
                <strong>Vidya Bharti Public School</strong>
                <small>Sikar, Rajasthan</small>
              </span>
            </div>
          </div>

          <div className="facilities-hero-art">
            <div className="hero-art-image">
              <img
                src={photos.hero}
                alt="School cultural programme"
              />
              <div className="hero-image-shade" />
              <div className="hero-image-caption">
                <span>SHAPING BETTER TOMORROWS</span>
                <strong>Learn. Discover. Grow.</strong>
              </div>
            </div>

            <div className="hero-floating-card hero-floating-top">
              <span className="floating-icon">✳</span>
              <span>
                <strong>Creativity</strong>
                <small>Explore new ideas</small>
              </span>
            </div>

            <div className="hero-floating-card hero-floating-bottom">
              <span className="floating-icon floating-icon-pink">↗</span>
              <span>
                <strong>Confidence</strong>
                <small>Grow every day</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="facilities-intro">
        <div className="facilities-container facilities-intro-grid">
          <div>
            <span className="facilities-section-label">
              OUR LEARNING ENVIRONMENT
            </span>
            <h2>
              More than a classroom.
              <br />
              <span>A place to flourish.</span>
            </h2>
          </div>

          <div className="facilities-intro-text">
            <p>
              At Vidya Bharti Public School, our facilities
              support learning beyond textbooks. Students can
              develop digital literacy, life skills, leadership,
              creativity and confidence through varied learning
              experiences.
            </p>
            <p>
              Our aim is to encourage curiosity, participation,
              physical fitness and the development of every learner.
            </p>
          </div>
        </div>
      </section>

      {/* CLIENT-PROVIDED FACILITIES */}
      <section
        className="facilities-list-section"
        id="school-facilities"
      >
        <div className="facilities-container">
          <div className="facilities-heading-row">
            <SectionHeading
              eyebrow="OUR SCHOOL FACILITIES"
              title="Discover Our"
              accent="Facilities"
              description="Explore the learning spaces and opportunities available at our school."
            />
            <span className="facilities-count">
              05 FACILITIES
            </span>
          </div>

          <div className="facilities-card-grid">
            {facilities.map((item) => (
              <FacilityCard key={item.number} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* SCHOOL PROGRAMMES GALLERY */}
      <section
        className="facilities-gallery-section"
        id="school-programs"
      >
        <div className="facilities-container">
          <SectionHeading
            eyebrow="MOMENTS FROM OUR SCHOOL"
            title="School Programs &"
            accent="Activities"
            description="A glimpse of cultural celebrations, student participation, creative activities and sports at Vidya Bharti Public School."
          />

          <div className="facilities-gallery-grid">
            {programs.map((item) => (
              <ProgramCard key={item.title} item={item} />
            ))}
          </div>

          <p className="facilities-gallery-note">
            Programme photographs shared for the school website.
            Please confirm event titles and dates with the school
            before publishing.
          </p>
        </div>
      </section>

      {/* SCHOOL APPROACH */}
      <section className="facilities-approach">
        <div className="facilities-container">
          <div className="approach-heading">
            <span className="facilities-section-label">
              OUR APPROACH
            </span>
            <h2>
              Helping every student
              <br />
              <span>become their best.</span>
            </h2>
            <p>
              Every learner has the potential to grow. Learning,
              creativity and participation can help students develop
              knowledge, character and confidence.
            </p>
          </div>

          <div className="approach-grid">
            {highlights.map((item) => (
              <article className="approach-card" key={item.number}>
                <span className="approach-number">
                  {item.number}
                </span>
                <div className="approach-symbol">
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="facilities-cta-section">
        <div className="facilities-container">
          <div className="facilities-cta">
            <div className="cta-decoration" />

            <div className="cta-copy">
              <span className="cta-eyebrow">
                YOUR CHILD'S JOURNEY STARTS HERE
              </span>
              <h2>
                Let's build a brighter
                <br />
                <span>future together.</span>
              </h2>
              <p>
                Contact Vidya Bharti Public School to learn more
                about admissions and our learning environment.
              </p>
            </div>

            <div className="cta-actions">
              <a href="/admissions" className="cta-admission-btn">
                Explore Admissions <ArrowIcon />
              </a>
              <a href="/contact" className="cta-contact-link">
                Contact Us <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
