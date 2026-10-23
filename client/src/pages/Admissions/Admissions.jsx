
import { useState } from "react";
import "./Admissions.css";

const initialForm = {
  studentName: "",
  classApplying: "",
  dateOfBirth: "",
  guardianName: "",
  mobile: "",
  whatsapp: "",
  email: "",
  currentSchool: "",
  message: "",
  consent: false,
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Admissions() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  function handleChange(event) {
    const { name, value, checked, type } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch(`${API_URL}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Submission nahi ho paya. Please try again."
        );
      }

      setStatus("success");
      setStatusMessage(
        result.message ||
          "Your admission enquiry has been submitted successfully!"
      );
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error.message ||
          "Server se connection nahi ho paya. Please try again later."
      );
    }
  }

  return (
    <main className="admission-page">
      <section className="admission-hero">
        <div className="admission-hero-inner">
          <span className="admission-eyebrow">
            VIDYA BHARATI PUBLIC SCHOOL
          </span>

          <h1>
            Begin Your Child's
            <span> Bright Future</span>
          </h1>

          <p>
            Take the first step towards a learning journey filled with
            knowledge, confidence, values and opportunities.
          </p>

          <div className="admission-hero-points">
            <span>✦ Student-focused learning</span>
            <span>✦ Strong values</span>
            <span>✦ Bright opportunities</span>
          </div>
        </div>

        <div className="admission-hero-decoration" aria-hidden="true">
          VPS
        </div>
      </section>

      <section className="admission-content">
        <div className="admission-side">
          <span className="admission-section-label">
            ADMISSIONS 2026–27
          </span>

          <h2>Let's get to know your child.</h2>

          <p>
            Fill in the details below and our school team can contact you
            regarding admission enquiries and the next steps.
          </p>

          <div className="admission-info-card">
            <span className="admission-info-icon">01</span>
            <div>
              <h3>Share the details</h3>
              <p>Complete the student and parent information.</p>
            </div>
          </div>

          <div className="admission-info-card">
            <span className="admission-info-icon">02</span>
            <div>
              <h3>School follow-up</h3>
              <p>The school can contact you about your enquiry.</p>
            </div>
          </div>

          <div className="admission-contact-note">
            <strong>Need assistance?</strong>
            <p>Vidya Bharati Public School, Sikar, Rajasthan</p>

            <a href="tel:8302977245">
              Call: 8302977245
            </a>

            <a href="tel:9352812501">
              Call: 9352812501
            </a>

            <a href="mailto:vbpssikar@gmail.com">
              vbpssikar@gmail.com
            </a>
          </div>
        </div>

        <div className="admission-form-card">
          <div className="admission-form-heading">
            <span className="admission-section-label">
              ADMISSION ENQUIRY
            </span>
            <h2>Student Registration Enquiry</h2>
            <p>Fields marked * are required.</p>
          </div>

          {statusMessage && (
            <div
              className={`admission-alert admission-alert-${status}`}
              role="status"
              aria-live="polite"
            >
              <strong>
                {status === "success"
                  ? "✓ Submitted successfully"
                  : status === "error"
                    ? "Submission failed"
                    : "Please wait"}
              </strong>
              <p>{statusMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="admission-form">
            <div className="admission-field">
              <label htmlFor="studentName">
                Student's full name *
              </label>
              <input
                id="studentName"
                name="studentName"
                value={form.studentName}
                onChange={handleChange}
                placeholder="Enter student's full name"
                autoComplete="name"
                maxLength={100}
                required
              />
            </div>

            <div className="admission-field">
              <label htmlFor="classApplying">
                Class applying for *
              </label>
              <select
                id="classApplying"
                name="classApplying"
                value={form.classApplying}
                onChange={handleChange}
                required
              >
                <option value="">Select class</option>
                {[
                  "Nursery",
                  "LKG",
                  "UKG",
                  ...Array.from(
                    { length: 12 },
                    (_, i) => `Class ${i + 1}`
                  ),
                ].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="admission-field">
              <label htmlFor="dateOfBirth">Date of birth *</label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={form.dateOfBirth}
                onChange={handleChange}
                max={new Date().toISOString().slice(0, 10)}
                required
              />
            </div>

            <div className="admission-field">
              <label htmlFor="guardianName">
                Parent / guardian name *
              </label>
              <input
                id="guardianName"
                name="guardianName"
                value={form.guardianName}
                onChange={handleChange}
                placeholder="Enter parent or guardian name"
                maxLength={100}
                required
              />
            </div>

            <div className="admission-field">
              <label htmlFor="mobile">Mobile number *</label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                inputMode="numeric"
                pattern="[6-9][0-9]{9}"
                title="Enter a valid 10-digit Indian mobile number"
                value={form.mobile}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                maxLength={10}
                required
              />
            </div>

            <div className="admission-field">
              <label htmlFor="whatsapp">
                WhatsApp number (optional)
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                inputMode="numeric"
                pattern="[6-9][0-9]{9}"
                title="Enter a valid 10-digit Indian mobile number"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="WhatsApp number"
                maxLength={10}
              />
            </div>

            <div className="admission-field admission-field-full">
              <label htmlFor="email">Email address *</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="parent@example.com"
                maxLength={150}
                required
              />
            </div>

            <div className="admission-field admission-field-full">
              <label htmlFor="currentSchool">
                Current school <span>(optional)</span>
              </label>
              <input
                id="currentSchool"
                name="currentSchool"
                value={form.currentSchool}
                onChange={handleChange}
                placeholder="Name of current school, if applicable"
                maxLength={150}
              />
            </div>

            <div className="admission-field admission-field-full">
              <label htmlFor="message">Message / enquiry *</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your admission enquiry..."
                rows={4}
                maxLength={2000}
                required
              />
            </div>

            <label className="admission-consent admission-field-full">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={handleChange}
                required
              />
              <span>
                I agree that Vidya Bharati Public School may contact me
                regarding this admission enquiry. *
              </span>
            </label>

            <div className="admission-submit-wrap admission-field-full">
              <button
                type="submit"
                className="admission-submit"
                disabled={status === "loading"}
              >
                {status === "loading"
                  ? "Submitting..."
                  : "Submit Admission Enquiry"}
                <span aria-hidden="true">→</span>
              </button>

              <p>
                Your information will be used to respond to your enquiry.
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
