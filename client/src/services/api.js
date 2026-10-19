const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'
async function request(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'Request failed')
  return data
}
export const getNotices = () => request('/api/notices')
export const submitAdmissionEnquiry = (data) => request('/api/enquiries', { method: 'POST', body: JSON.stringify(data) })
