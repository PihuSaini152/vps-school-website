import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './AdminDashboard.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const LOGO_URL = '/AdminLogin/Logo.PNG'

const MENU_ITEMS = [
  {
    id: 'enquiries',
    icon: '📋',
    title: 'Admission Enquiries',
    description: 'View submitted student admission enquiry forms.',
    color: '#eaf1ff',
  },
  {
    id: 'jobs',
    icon: '💼',
    title: 'Job Applications',
    description: 'View and manage submitted job applications.',
    color: '#fff4df',
  },
{
  id: 'gallery',
  icon: '🖼️',
  title: 'Website Image Manager',
  description: 'Manage photos across website pages, except the Home Page.',
  color: '#fff0f5',
},
  {
    id: 'notices',
    icon: '📢',
    title: 'Notice Management',
    description: 'Add, edit and delete school notices.',
    color: '#e9f8f2',
  },
]

function getSectionFromPath(pathname) {
  const section = pathname
    .replace('/admin/dashboard', '')
    .replace(/^\/+|\/+$/g, '')

  return ['enquiries', 'jobs', 'gallery', 'notices'].includes(section)
    ? section
    : 'home'
}

function formatDate(value) {
  if (!value) return '—'

  const date = new Date(value)

  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString('en-IN')
}

function formatDateTime(value) {
  if (!value) return '—'

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="m19 6-1 14H6L5 6" />
      <path d="M10 11v5" />
      <path d="M14 11v5" />
    </svg>
  )
}

async function readJson(response) {
  const text = await response.text()

  try {
    return text ? JSON.parse(text) : {}
  } catch {
    throw new Error(
      'Server ने JSON की जगह HTML भेजा। Backend API route और server चेक करें।'
    )
  }
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const location = useLocation()

  const [activeSection, setActiveSection] = useState(() =>
    getSectionFromPath(location.pathname)
  )

  const [enquiries, setEnquiries] = useState([])
  const [jobApplications, setJobApplications] = useState([])
  const [galleryItems, setGalleryItems] = useState([])
  const [notices, setNotices] = useState([])

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  const [galleryTitle, setGalleryTitle] = useState('')
  const [galleryFile, setGalleryFile] = useState(null)

  const [noticeTitle, setNoticeTitle] = useState('')
  const [noticeBody, setNoticeBody] = useState('')
  const [noticePublished, setNoticePublished] = useState(true)
  const [editingNoticeId, setEditingNoticeId] = useState(null)

  const logout = useCallback(() => {
    sessionStorage.removeItem('adminToken')
    navigate('/admin', { replace: true })
  }, [navigate])

  const apiRequest = useCallback(
    async (path, options = {}) => {
      const token = sessionStorage.getItem('adminToken')

      if (!token) {
        logout()
        throw new Error('Session expired. Please log in again.')
      }

      const isFormData = options.body instanceof FormData

      let response

      try {
        response = await fetch(`${API_URL}${path}`, {
          ...options,
          headers: {
            ...(isFormData
              ? {}
              : { 'Content-Type': 'application/json' }),
            Authorization: `Bearer ${token}`,
            ...options.headers,
          },
        })
      } catch {
        throw new Error(
          `Backend से connection नहीं हो रहा। कृपया backend server चालू करें। API: ${API_URL}`
        )
      }

      const data = await readJson(response)

      if (response.status === 401) {
        logout()
        throw new Error('Session expired. Please log in again.')
      }

      if (!response.ok) {
        throw new Error(data.message || 'Request failed.')
      }

      return data
    },
    [logout]
  )

  useEffect(() => {
    setActiveSection(getSectionFromPath(location.pathname))
  }, [location.pathname])

  const openSection = (section) => {
    setError('')
    setSuccessMessage('')

    navigate(
      section === 'home'
        ? '/admin/dashboard'
        : `/admin/dashboard/${section}`
    )

    setActiveSection(section)
  }

  // Admission Enquiries
  const loadEnquiries = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const data = await apiRequest('/api/admin/enquiries')
      const rows = Array.isArray(data) ? data : data.enquiries

      if (!Array.isArray(rows)) {
        throw new Error('Server response में enquiry list नहीं मिली।')
      }

      setEnquiries(rows)
    } catch (err) {
      setError(err.message || 'Unable to load enquiries.')
    } finally {
      setLoading(false)
    }
  }, [apiRequest])

  // Job Applications
  const loadJobApplications = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const data = await apiRequest('/api/admin/job-applications')
      const rows = Array.isArray(data) ? data : data.applications

      if (!Array.isArray(rows)) {
        throw new Error(
          'Server response में job applications list नहीं मिली।'
        )
      }

      setJobApplications(rows)
    } catch (err) {
      setError(err.message || 'Unable to load job applications.')
    } finally {
      setLoading(false)
    }
  }, [apiRequest])

  // Gallery
  const loadGallery = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const data = await apiRequest('/api/admin/gallery')
      const rows = Array.isArray(data) ? data : data.gallery

      if (!Array.isArray(rows)) {
        throw new Error('Gallery API से सही list नहीं मिली।')
      }

      setGalleryItems(rows)
    } catch (err) {
      setError(err.message || 'Unable to load gallery photos.')
    } finally {
      setLoading(false)
    }
  }, [apiRequest])

  // Notices
  const loadNotices = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const data = await apiRequest('/api/admin/notices')
      const rows = Array.isArray(data) ? data : data.notices

      if (!Array.isArray(rows)) {
        throw new Error('Notice API से सही list नहीं मिली।')
      }

      setNotices(rows)
    } catch (err) {
      setError(err.message || 'Unable to load notices.')
    } finally {
      setLoading(false)
    }
  }, [apiRequest])

  useEffect(() => {
    if (!sessionStorage.getItem('adminToken')) {
      logout()
      return
    }

    if (activeSection === 'enquiries') loadEnquiries()
    if (activeSection === 'jobs') loadJobApplications()
    if (activeSection === 'gallery') loadGallery()
    if (activeSection === 'notices') loadNotices()
  }, [
    activeSection,
    logout,
    loadEnquiries,
    loadJobApplications,
    loadGallery,
    loadNotices,
  ])

  // Delete admission enquiry
  const deleteEnquiry = async (id, studentName) => {
    if (
      !window.confirm(
        `क्या आप ${studentName || 'इस student'} की enquiry हमेशा के लिए delete करना चाहते हैं?`
      )
    ) {
      return
    }

    setDeletingId(id)
    setError('')
    setSuccessMessage('')

    try {
      const data = await apiRequest(
        `/api/admin/enquiries/${encodeURIComponent(id)}`,
        { method: 'DELETE' }
      )

      setEnquiries((old) =>
        old.filter((item) => String(item.id) !== String(id))
      )

      setSuccessMessage(
        data.message || 'Admission enquiry deleted successfully.'
      )
    } catch (err) {
      setError(err.message || 'Unable to delete enquiry.')
    } finally {
      setDeletingId(null)
    }
  }

  // Delete job application
  const deleteJobApplication = async (item) => {
    if (
      !window.confirm(
        `क्या आप ${item.full_name || 'इस applicant'} की job application permanently delete करना चाहते हैं?`
      )
    ) {
      return
    }

    setDeletingId(item.id)
    setError('')
    setSuccessMessage('')

    try {
      const data = await apiRequest(
        `/api/admin/job-applications/${encodeURIComponent(item.id)}`,
        { method: 'DELETE' }
      )

      setJobApplications((old) =>
        old.filter((app) => String(app.id) !== String(item.id))
      )

      setSuccessMessage(
        data.message || 'Job application deleted successfully.'
      )
    } catch (err) {
      setError(err.message || 'Unable to delete job application.')
    } finally {
      setDeletingId(null)
    }
  }

  // Upload gallery photo
  const uploadGalleryPhoto = async (event) => {
    event.preventDefault()

    if (!galleryFile) {
      setError('पहले Choose Photo बटन से अपने laptop की photo चुनें।')
      return
    }

    if (!galleryFile.type.startsWith('image/')) {
      setError('कृपया image file ही चुनें।')
      return
    }

    if (galleryFile.size > 8 * 1024 * 1024) {
      setError('Photo 8 MB से छोटी होनी चाहिए।')
      return
    }

    setSaving(true)
    setError('')
    setSuccessMessage('')

    try {
      const formData = new FormData()

      formData.append('image', galleryFile)
      formData.append('title', galleryTitle.trim())

      const data = await apiRequest('/api/admin/gallery', {
        method: 'POST',
        body: formData,
      })

      setGalleryTitle('')
      setGalleryFile(null)
      event.currentTarget.reset()

      setSuccessMessage(data.message || 'Photo uploaded successfully.')

      await loadGallery()
    } catch (err) {
      setError(err.message || 'Unable to upload photo.')
    } finally {
      setSaving(false)
    }
  }

  // Delete gallery photo
  const deleteGalleryPhoto = async (item) => {
    if (
      !window.confirm(
        'क्या आप यह photo gallery से permanently delete करना चाहते हैं?'
      )
    ) {
      return
    }

    setDeletingId(item.id)
    setError('')
    setSuccessMessage('')

    try {
      const data = await apiRequest(
        `/api/admin/gallery/${encodeURIComponent(item.id)}`,
        { method: 'DELETE' }
      )

      setGalleryItems((old) =>
        old.filter((photo) => String(photo.id) !== String(item.id))
      )

      setSuccessMessage(data.message || 'Photo deleted successfully.')
    } catch (err) {
      setError(err.message || 'Unable to delete photo.')
    } finally {
      setDeletingId(null)
    }
  }

  // Notice form
  const resetNoticeForm = () => {
    setNoticeTitle('')
    setNoticeBody('')
    setNoticePublished(true)
    setEditingNoticeId(null)
  }

  const submitNotice = async (event) => {
    event.preventDefault()

    if (!noticeTitle.trim() || !noticeBody.trim()) {
      setError('Notice title और content दोनों भरें।')
      return
    }

    setSaving(true)
    setError('')
    setSuccessMessage('')

    try {
      const isEditing = editingNoticeId !== null

      const data = await apiRequest(
        isEditing
          ? `/api/admin/notices/${encodeURIComponent(editingNoticeId)}`
          : '/api/admin/notices',
        {
          method: isEditing ? 'PUT' : 'POST',
          body: JSON.stringify({
            title: noticeTitle.trim(),
            body: noticeBody.trim(),
            is_published: noticePublished ? 1 : 0,
          }),
        }
      )

      resetNoticeForm()

      setSuccessMessage(
        data.message ||
          (isEditing
            ? 'Notice updated successfully.'
            : 'Notice created successfully.')
      )

      await loadNotices()
    } catch (err) {
      setError(err.message || 'Unable to save notice.')
    } finally {
      setSaving(false)
    }
  }

  const editNotice = (item) => {
    setEditingNoticeId(item.id)
    setNoticeTitle(item.title || '')
    setNoticeBody(item.body || '')
    setNoticePublished(Boolean(Number(item.is_published)))

    setError('')
    setSuccessMessage('')

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const deleteNotice = async (item) => {
    if (
      !window.confirm(
        `क्या आप "${item.title}" notice permanently delete करना चाहते हैं?`
      )
    ) {
      return
    }

    setDeletingId(item.id)
    setError('')
    setSuccessMessage('')

    try {
      const data = await apiRequest(
        `/api/admin/notices/${encodeURIComponent(item.id)}`,
        { method: 'DELETE' }
      )

      setNotices((old) =>
        old.filter((notice) => String(notice.id) !== String(item.id))
      )

      if (String(editingNoticeId) === String(item.id)) {
        resetNoticeForm()
      }

      setSuccessMessage(data.message || 'Notice deleted successfully.')
    } catch (err) {
      setError(err.message || 'Unable to delete notice.')
    } finally {
      setDeletingId(null)
    }
  }

  // Shared success and error messages
  const renderMessages = () => (
    <>
      {error && (
        <div className="admin-error" role="alert">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => {
              if (activeSection === 'enquiries') loadEnquiries()
              else if (activeSection === 'jobs') loadJobApplications()
              else if (activeSection === 'gallery') loadGallery()
              else if (activeSection === 'notices') loadNotices()
            }}
          >
            Try Again
          </button>
        </div>
      )}

      {successMessage && (
        <div className="admin-success" role="status">
          {successMessage}
        </div>
      )}
    </>
  )

  // Admission enquiries screen
  const renderEnquiries = () => (
    <section className="admin-content-section">
      <button
        type="button"
        className="admin-back"
        onClick={() => openSection('home')}
      >
        ← Back to Dashboard
      </button>

      <div className="admin-content-heading">
        <div>
          <p className="admin-eyebrow">STUDENT ADMISSIONS</p>
          <h1>Admission Enquiries</h1>
          <p className="admin-subtitle">
            View submitted admission enquiry forms.
          </p>
        </div>

        <button
          type="button"
          className="admin-primary-button"
          onClick={loadEnquiries}
          disabled={loading}
        >
          {loading ? 'Loading...' : '↻ Refresh'}
        </button>
      </div>

      {renderMessages()}

      <div className="admin-enquiry-summary">
        <span>Total enquiries loaded</span>
        <strong>{enquiries.length}</strong>
      </div>

      {loading && enquiries.length === 0 ? (
        <div className="admin-empty-state">
          <span>⏳</span>
          <h3>Loading enquiries...</h3>
          <p>Please wait.</p>
        </div>
      ) : error && enquiries.length === 0 ? (
        <div className="admin-empty-state">
          <span>⚠️</span>
          <h3>Unable to load enquiries</h3>
          <p>Check the server connection and try again.</p>
        </div>
      ) : enquiries.length === 0 ? (
        <div className="admin-empty-state">
          <span>📋</span>
          <h3>No admission enquiries yet</h3>
          <p>Submitted admission forms will appear here.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Class</th>
                <th>Date of Birth</th>
                <th>Parent / Guardian</th>
                <th>Mobile Number</th>
                <th>WhatsApp Number</th>
                <th>Email Address</th>
                <th>Current School</th>
                <th>Message</th>
                <th>Received On</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {enquiries.map((item) => (
                <tr key={item.id}>
                  <td className="admin-student-name">
                    {item.student_name || '—'}
                  </td>
                  <td className="admin-nowrap">
                    {String(item.applying_class || '—').replace(
                      /^class\s+/i,
                      ''
                    )}
                  </td>
                  <td className="admin-nowrap">
                    {formatDate(item.date_of_birth)}
                  </td>
                  <td>{item.parent_name || '—'}</td>
                  <td className="admin-nowrap">
                    {item.mobile_number ? (
                      <a href={`tel:${item.mobile_number}`}>
                        {item.mobile_number}
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="admin-nowrap">
                    {item.whatsapp_number ? (
                      <a
                        href={`https://wa.me/${String(
                          item.whatsapp_number
                        ).replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.whatsapp_number}
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="admin-email-cell">
                    {item.email ? (
                      <a href={`mailto:${item.email}`}>{item.email}</a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td>{item.current_school || '—'}</td>
                  <td className="admin-message-cell">
                    {item.message || '—'}
                  </td>
                  <td className="admin-nowrap">
                    {formatDateTime(item.created_at)}
                  </td>
                  <td className="admin-action-cell">
                    <button
                      type="button"
                      className="admin-delete-button"
                      title="Delete enquiry"
                      aria-label={`Delete enquiry for ${
                        item.student_name || 'student'
                      }`}
                      disabled={deletingId !== null}
                      onClick={() =>
                        deleteEnquiry(item.id, item.student_name)
                      }
                    >
                      {deletingId === item.id ? '...' : <TrashIcon />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )

  // Job applications screen
  const renderJobs = () => (
    <section className="admin-content-section">
      <button
        type="button"
        className="admin-back"
        onClick={() => openSection('home')}
      >
        ← Back to Dashboard
      </button>

      <div className="admin-content-heading">
        <div>
          <p className="admin-eyebrow">CAREERS</p>
          <h1>Job Applications</h1>
          <p className="admin-subtitle">
            View and manage applications submitted by job applicants.
          </p>
        </div>

        <button
          type="button"
          className="admin-primary-button"
          onClick={loadJobApplications}
          disabled={loading}
        >
          {loading ? 'Loading...' : '↻ Refresh'}
        </button>
      </div>

      {renderMessages()}

      <div className="admin-enquiry-summary">
        <span>Total job applications</span>
        <strong>{jobApplications.length}</strong>
      </div>

      {loading && jobApplications.length === 0 ? (
        <div className="admin-empty-state">
          <span>⏳</span>
          <h3>Loading applications...</h3>
          <p>Please wait.</p>
        </div>
      ) : error && jobApplications.length === 0 ? (
        <div className="admin-empty-state">
          <span>⚠️</span>
          <h3>Unable to load applications</h3>
          <p>Check the backend server and job applications API.</p>
        </div>
      ) : jobApplications.length === 0 ? (
        <div className="admin-empty-state">
          <span>💼</span>
          <h3>No job applications yet</h3>
          <p>Submitted job application forms will appear here.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Applying For</th>
                <th>Qualification</th>
                <th>Experience Type</th>
                <th>Total Experience</th>
                <th>Additional Message</th>
                <th>Received On</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {jobApplications.map((item) => (
                <tr key={item.id}>
                  <td className="admin-student-name">
                    {item.full_name || '—'}
                  </td>
                  <td className="admin-nowrap">
                    {item.mobile_number ? (
                      <a href={`tel:${item.mobile_number}`}>
                        {item.mobile_number}
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="admin-email-cell">
                    {item.email ? (
                      <a href={`mailto:${item.email}`}>{item.email}</a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td>{item.applying_for || '—'}</td>
                  <td>{item.qualification || '—'}</td>
                  <td>{item.experience_type || '—'}</td>
                  <td>{item.total_experience || '—'}</td>
                  <td className="admin-message-cell">
                    {item.additional_message || '—'}
                  </td>
                  <td className="admin-nowrap">
                    {formatDateTime(item.created_at)}
                  </td>
                  <td className="admin-action-cell">
                    <button
                      type="button"
                      className="admin-delete-button"
                      title="Delete job application"
                      aria-label={`Delete application for ${
                        item.full_name || 'applicant'
                      }`}
                      disabled={deletingId !== null}
                      onClick={() => deleteJobApplication(item)}
                    >
                      {deletingId === item.id ? '...' : <TrashIcon />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )

  // Gallery screen
  const renderGallery = () => (
    <section className="admin-content-section">
      <button
        type="button"
        className="admin-back"
        onClick={() => openSection('home')}
      >
        ← Back to Dashboard
      </button>

      <div className="admin-content-heading">
        <div>
          <p className="admin-eyebrow">WEBSITE CONTENT</p>
          <h1>Gallery Management</h1>
          <p className="admin-subtitle">
            अपने laptop से school photos upload करें और gallery manage करें।
          </p>
        </div>

        <button
          type="button"
          className="admin-primary-button"
          onClick={loadGallery}
          disabled={loading}
        >
          {loading ? 'Loading...' : '↻ Refresh'}
        </button>
      </div>

      {renderMessages()}

      <form
        className="admin-editor-form gallery-upload-form"
        onSubmit={uploadGalleryPhoto}
      >
        <h2>Upload New Photo</h2>
        <p className="admin-form-help">
          School की photo चुनें और चाहें तो उसका title भी लिखें।
        </p>

        <label htmlFor="gallery-title">Photo Title (Optional)</label>
        <input
          id="gallery-title"
          type="text"
          value={galleryTitle}
          onChange={(event) => setGalleryTitle(event.target.value)}
          placeholder="जैसे: Annual Function 2026"
          maxLength={150}
        />

        <label htmlFor="gallery-image" className="gallery-file-label">
          Choose Photo
        </label>
        <input
          id="gallery-image"
          className="gallery-file-input"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={(event) =>
            setGalleryFile(event.target.files?.[0] || null)
          }
        />

        <div className="gallery-file-picker">
          <label htmlFor="gallery-image" className="gallery-choose-button">
            📁 Choose Photo
          </label>
          <span className="gallery-selected-filename">
            {galleryFile
              ? galleryFile.name
              : 'अभी कोई photo select नहीं की गई'}
          </span>
        </div>

        <p className="admin-form-help">
          JPG, PNG, WEBP या GIF चुनें। Maximum size: 8 MB.
        </p>

        {galleryFile && (
          <div className="gallery-preview">
            <img
              src={URL.createObjectURL(galleryFile)}
              alt="Selected photo preview"
            />
            <button
              type="button"
              className="admin-secondary-button"
              onClick={() => {
                setGalleryFile(null)
                const input = document.getElementById('gallery-image')
                if (input) input.value = ''
              }}
            >
              Remove Photo
            </button>
          </div>
        )}

        <button
          type="submit"
          className="admin-primary-button gallery-upload-button"
          disabled={saving || !galleryFile}
        >
          {saving ? 'Uploading Photo...' : '⬆ Upload Photo'}
        </button>
      </form>

      <div className="admin-section-heading">
        <h2>Uploaded Photos ({galleryItems.length})</h2>
        <p>यहाँ upload की गई photos दिखाई देंगी।</p>
      </div>

      {loading && galleryItems.length === 0 ? (
        <div className="admin-empty-state">
          <h3>Photos load हो रही हैं...</h3>
        </div>
      ) : error && galleryItems.length === 0 ? (
        <div className="admin-empty-state">
          <span>⚠️</span>
          <h3>Unable to load gallery</h3>
          <p>Backend server और Gallery API चेक करें।</p>
        </div>
      ) : galleryItems.length === 0 ? (
        <div className="admin-empty-state">
          <span>🖼️</span>
          <h3>No photos uploaded yet</h3>
          <p>ऊपर Choose Photo पर क्लिक करके अपनी पहली photo upload करें।</p>
        </div>
      ) : (
        <div className="admin-gallery-grid">
          {galleryItems.map((item) => {
            const imageUrl =
              item.image_url ||
              item.imageUrl ||
              item.url ||
              (item.filename
                ? `${API_URL}/uploads/${encodeURIComponent(item.filename)}`
                : '')

            return (
              <article className="admin-gallery-card" key={item.id}>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={item.title || 'School gallery'}
                    loading="lazy"
                  />
                ) : (
                  <div className="admin-gallery-no-image">
                    Image unavailable
                  </div>
                )}

                <div className="admin-gallery-card-info">
                  <strong>{item.title || 'School Photo'}</strong>
                  <button
                    type="button"
                    className="admin-delete-button"
                    title="Delete photo"
                    aria-label="Delete photo"
                    disabled={deletingId !== null}
                    onClick={() => deleteGalleryPhoto(item)}
                  >
                    {deletingId === item.id ? '...' : <TrashIcon />}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )

  // Notices screen
  const renderNotices = () => (
    <section className="admin-content-section">
      <button
        type="button"
        className="admin-back"
        onClick={() => openSection('home')}
      >
        ← Back to Dashboard
      </button>

      <div className="admin-content-heading">
        <div>
          <p className="admin-eyebrow">WEBSITE CONTENT</p>
          <h1>Notice Management</h1>
          <p className="admin-subtitle">
            School announcements add, edit, publish या delete करें।
          </p>
        </div>

        <button
          type="button"
          className="admin-primary-button"
          onClick={loadNotices}
          disabled={loading}
        >
          {loading ? 'Loading...' : '↻ Refresh'}
        </button>
      </div>

      {renderMessages()}

      <form className="admin-editor-form" onSubmit={submitNotice}>
        <h2>{editingNoticeId !== null ? 'Edit Notice' : 'Add New Notice'}</h2>

        <label htmlFor="notice-title">Notice title</label>
        <input
          id="notice-title"
          type="text"
          value={noticeTitle}
          onChange={(event) => setNoticeTitle(event.target.value)}
          placeholder="Enter notice title"
          maxLength={200}
          required
        />

        <label htmlFor="notice-body">Notice details</label>
        <textarea
          id="notice-body"
          value={noticeBody}
          onChange={(event) => setNoticeBody(event.target.value)}
          placeholder="Write the full notice here..."
          rows={5}
          required
        />

        <label className="admin-checkbox-label">
          <input
            type="checkbox"
            checked={noticePublished}
            onChange={(event) => setNoticePublished(event.target.checked)}
          />
          Publish this notice on the website
        </label>

        <div className="admin-form-actions">
          <button
            type="submit"
            className="admin-primary-button"
            disabled={saving}
          >
            {saving
              ? 'Saving...'
              : editingNoticeId !== null
                ? 'Update Notice'
                : 'Add Notice'}
          </button>

          {editingNoticeId !== null && (
            <button
              type="button"
              className="admin-back admin-cancel-button"
              onClick={resetNoticeForm}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="admin-section-heading">
        <h2>Saved Notices ({notices.length})</h2>
        <p>Manage existing school notices.</p>
      </div>

      {loading && notices.length === 0 ? (
        <div className="admin-empty-state">
          <h3>Loading notices...</h3>
        </div>
      ) : notices.length === 0 ? (
        <div className="admin-empty-state">
          <span>📢</span>
          <h3>No notices added yet</h3>
          <p>Add your first notice using the form above.</p>
        </div>
      ) : (
        <div className="admin-notice-list">
          {notices.map((item) => (
            <article className="admin-notice-card" key={item.id}>
              <div className="admin-notice-card-heading">
                <div>
                  <h3>{item.title}</h3>
                  <span
                    className={`admin-status-badge ${
                      Number(item.is_published) ? 'is-published' : 'is-draft'
                    }`}
                  >
                    {Number(item.is_published) ? 'Published' : 'Draft'}
                  </span>
                </div>

                <div className="admin-form-actions">
                  <button
                    type="button"
                    className="admin-secondary-button"
                    onClick={() => editNotice(item)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="admin-delete-button"
                    title="Delete notice"
                    aria-label={`Delete notice ${item.title}`}
                    disabled={deletingId !== null}
                    onClick={() => deleteNotice(item)}
                  >
                    {deletingId === item.id ? '...' : <TrashIcon />}
                  </button>
                </div>
              </div>

              <p className="admin-notice-body">{item.body}</p>

              <small>Added: {formatDateTime(item.created_at)}</small>
            </article>
          ))}
        </div>
      )}
    </section>
  )

  return (
    <div className="admin-dashboard">
      <header className="admin-topbar">
        <div className="admin-brand">
          <div className="admin-brand-logo">
            <img
              src={LOGO_URL}
              alt="Vidya Bharati Public School logo"
              onError={(event) => {
                event.currentTarget.style.display = 'none'
              }}
            />
          </div>

          <div>
            <p className="admin-school-name">
              VIDYA BHARATI PUBLIC SCHOOL
            </p>
            <span className="admin-panel-label">School Administration</span>
          </div>
        </div>

        <button type="button" className="admin-logout" onClick={logout}>
          <span aria-hidden="true">↪</span> Logout
        </button>
      </header>

      <main className="admin-main">
        {activeSection === 'home' ? (
          <>
            <div className="admin-welcome">
              <div>
                <p className="admin-eyebrow">ADMINISTRATION</p>
                <h1>Admin Dashboard</h1>
                <p className="admin-subtitle">
                  Welcome! What would you like to manage today?
                </p>
              </div>

              <div className="admin-welcome-icon" aria-hidden="true">
                🏫
              </div>
            </div>

            <div className="admin-stats">
              <div>
                <span className="admin-stat-label">Management Sections</span>
                <strong>{String(MENU_ITEMS.length).padStart(2, '0')}</strong>
              </div>

              <div>
                <span className="admin-stat-label">Admission Enquiries</span>
                <strong>
                  <button
                    type="button"
                    className="admin-stat-link"
                    onClick={() => openSection('enquiries')}
                  >
                    View enquiries →
                  </button>
                </strong>
              </div>

              <div>
                <span className="admin-stat-label">Job Applications</span>
                <strong>
                  <button
                    type="button"
                    className="admin-stat-link"
                    onClick={() => openSection('jobs')}
                  >
                    View applications →
                  </button>
                </strong>
              </div>
            </div>

            <div className="admin-section-heading">
              <h2>Management Sections</h2>
              <p>Select a section to continue.</p>
            </div>

            <div className="admin-menu-grid">
              {MENU_ITEMS.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className="admin-menu-card"
                  onClick={() => openSection(item.id)}
                >
                  <span
                    className="admin-card-icon"
                    style={{ background: item.color }}
                  >
                    {item.icon}
                  </span>

                  <span className="admin-card-title">{item.title}</span>

                  <span className="admin-card-description">
                    {item.description}
                  </span>

                  <span className="admin-card-link">
                    Open section <span aria-hidden="true">→</span>
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : activeSection === 'enquiries' ? (
          renderEnquiries()
        ) : activeSection === 'jobs' ? (
          renderJobs()
        ) : activeSection === 'gallery' ? (
          renderGallery()
        ) : (
          renderNotices()
        )}
      </main>

      <footer className="admin-footer">
        <span>VPS School Administration</span>
        <span>Secure Admin Panel</span>
      </footer>
    </div>
  )
}
