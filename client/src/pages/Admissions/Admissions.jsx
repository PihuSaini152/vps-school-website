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

const initialJobForm = {
  fullName: "",
  mobile: "",
  email: "",
  applyingFor: "",
  qualification: "",
  experienceType: "Fresher",
  totalExperience: "",
  additionalMessage: "",
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Admissions() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const [jobForm, setJobForm] = useState(initialJobForm);
  const [jobStatus, setJobStatus] = useState("idle");
  const [jobStatusMessage, setJobStatusMessage] = useState("");

  function handleChange(event) {
    const { name, value, checked, type } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleJobChange(event) {
    const { name, value } = event.target;

    setJobForm((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "experienceType" && value === "Fresher"
        ? { totalExperience: "" }
        : {}),
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
          result.message || "Unable to submit admission enquiry."
        );
      }

      setStatus("success");
      setStatusMessage(
        result.message || "Admission enquiry submitted successfully!"
      );
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error.message || "Unable to connect to the server. Please try again."
      );
    }
  }

  async function handleJobSubmit(event) {
    event.preventDefault();
    setJobStatus("loading");
    setJobStatusMessage("");

    try {
      const response = await fetch(`${API_URL}/api/job-applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobForm),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to submit job application."
        );
      }

      setJobStatus("success");
      setJobStatusMessage(
        result.message || "Job application submitted successfully!"
      );
      setJobForm(initialJobForm);
    } catch (error) {
      setJobStatus("error");
      setJobStatusMessage(
        error.message || "Unable to connect to the server. Please try again."
      );
    }
  }

  return (
    <main className="admission-page">
      {/* Admission Hero */}
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

      {/* Admission Form */}
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
            <a href="tel:8302977245">Call: 8302977245</a>
            <a href="tel:9352812501">Call: 9352812501</a>
            <a href="mailto:vbpssikar@gmail.com">vbpssikar@gmail.com</a>
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
              <label htmlFor="studentName">Student's full name *</label>
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
              <label htmlFor="classApplying">Class applying for *</label>
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
                  ...Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`),
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
              <label htmlFor="guardianName">Parent / guardian name *</label>
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
              <label htmlFor="whatsapp">WhatsApp number (optional)</label>
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

      {/* Job Application Form */}
      <section
        className="admission-content job-application-section"
        id="job-application"
      >
        <div className="admission-side">
          <span className="admission-section-label">CAREERS AT VPS</span>

          <h2>Build your career with us.</h2>

          <p>
            Interested in working at Vidya Bharati Public School? Complete
            the job application form. Our school team can review your details
            and contact you if a suitable opportunity is available.
          </p>

          <div className="admission-info-card">
            <span className="admission-info-icon">01</span>
            <div>
              <h3>Share your profile</h3>
              <p>Tell us about your qualification and experience.</p>
            </div>
          </div>

          <div className="admission-info-card">
            <span className="admission-info-icon">02</span>
            <div>
              <h3>Application review</h3>
              <p>The school team can review your submitted details.</p>
            </div>
          </div>

          <div className="admission-contact-note">
            <strong>Career Enquiries</strong>
            <p>Vidya Bharati Public School, Sikar, Rajasthan</p>
            <a href="mailto:vbpssikar@gmail.com">vbpssikar@gmail.com</a>
          </div>
        </div>

        <div className="admission-form-card">
          <div className="admission-form-heading">
            <span className="admission-section-label">JOB APPLICATION</span>
            <h2>Apply for a Position</h2>
            <p>Fields marked * are required.</p>
          </div>

          {jobStatusMessage && (
            <div
              className={`admission-alert admission-alert-${jobStatus}`}
              role="status"
              aria-live="polite"
            >
              <strong>
                {jobStatus === "success"
                  ? "✓ Application submitted"
                  : jobStatus === "error"
                    ? "Submission failed"
                    : "Please wait"}
              </strong>
              <p>{jobStatusMessage}</p>
            </div>
          )}

          <form onSubmit={handleJobSubmit} className="admission-form">
            <div className="admission-field">
              <label htmlFor="job-fullName">Full name *</label>
              <input
                id="job-fullName"
                name="fullName"
                value={jobForm.fullName}
                onChange={handleJobChange}
                placeholder="Enter your full name"
                autoComplete="name"
                maxLength={150}
                required
              />
            </div>

            <div className="admission-field">
              <label htmlFor="job-mobile">Mobile number *</label>
              <input
                id="job-mobile"
                name="mobile"
                type="tel"
                inputMode="numeric"
                pattern="[6-9][0-9]{9}"
                title="Enter a valid 10-digit Indian mobile number"
                value={jobForm.mobile}
                onChange={handleJobChange}
                placeholder="10-digit mobile number"
                maxLength={10}
                required
              />
            </div>

            <div className="admission-field admission-field-full">
              <label htmlFor="job-email">Email address *</label>
              <input
                id="job-email"
                name="email"
                type="email"
                value={jobForm.email}
                onChange={handleJobChange}
                placeholder="yourname@example.com"
                maxLength={150}
                required
              />
            </div>

            <div className="admission-field admission-field-full">
              <label htmlFor="job-applyingFor">Applying for post *</label>
              <select
                id="job-applyingFor"
                name="applyingFor"
                value={jobForm.applyingFor}
                onChange={handleJobChange}
                required
              >
                <option value="">Select a position</option>
                <option value="Teacher">Teacher</option>
                <option value="Computer Teacher">Computer Teacher</option>
                <option value="Clerk">Clerk</option>
                <option value="Accountant">Accountant</option>
                <option value="Peon">Peon</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="admission-field admission-field-full">
              <label htmlFor="job-qualification">Qualification *</label>
              <input
                id="job-qualification"
                name="qualification"
                value={jobForm.qualification}
                onChange={handleJobChange}
                placeholder="e.g. B.A., B.Ed., BCA, M.Sc."
                maxLength={200}
                required
              />
            </div>

            <div className="admission-field admission-field-full">
              <label htmlFor="job-experienceType">Experience *</label>
              <select
                id="job-experienceType"
                name="experienceType"
                value={jobForm.experienceType}
                onChange={handleJobChange}
                required
              >
                <option value="Fresher">Fresher</option>
                <option value="Experienced">Experienced</option>
              </select>
            </div>

            {jobForm.experienceType === "Experienced" && (
              <div className="admission-field admission-field-full">
                <label htmlFor="job-totalExperience">
                  Total experience *
                </label>
                <input
                  id="job-totalExperience"
                  name="totalExperience"
                  value={jobForm.totalExperience}
                  onChange={handleJobChange}
                  placeholder="e.g. 2 years or 6 months"
                  maxLength={100}
                  required
                />
              </div>
            )}

            <div className="admission-field admission-field-full">
              <label htmlFor="job-additionalMessage">
                Additional message (optional)
              </label>
              <textarea
                id="job-additionalMessage"
                name="additionalMessage"
                value={jobForm.additionalMessage}
                onChange={handleJobChange}
                placeholder="Tell us about your skills or relevant experience..."
                rows={4}
                maxLength={2000}
              />
            </div>

            <div className="admission-submit-wrap admission-field-full">
              <button
                type="submit"
                className="admission-submit"
                disabled={jobStatus === "loading"}
              >
                {jobStatus === "loading"
                  ? "Submitting Application..."
                  : "Submit Job Application"}
                <span aria-hidden="true">→</span>
              </button>

              <p>
                Your details will be used to review your job application.
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
