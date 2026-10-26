import { Router } from 'express'
import { upload } from '../middleware/galleryUpload.js'

import {
  adminLogin,
  getAdmissionEnquiries,
  deleteAdmissionEnquiry,
  getAdminNotices,
  createNotice,
  updateNotice,
  deleteNotice,
  getJobApplications,
  deleteJobApplication,
} from '../controllers/adminController.js'

import {
  getGallery,
  uploadGalleryPhoto,
  deleteGalleryPhoto,
  getWebsiteImages,
  replaceWebsiteImage,
} from '../controllers/galleryController.js'


import { requireAdmin } from '../middleware/adminAuth.js'

const router = Router()

// Admin login
router.post('/login', adminLogin)

// Admission enquiries
router.get('/enquiries', requireAdmin, getAdmissionEnquiries)
router.delete('/enquiries/:id', requireAdmin, deleteAdmissionEnquiry)

// Job applications
router.get('/job-applications', requireAdmin, getJobApplications)
router.delete('/job-applications/:id', requireAdmin, deleteJobApplication)

// Notice management
router.get('/notices', requireAdmin, getAdminNotices)
router.post('/notices', requireAdmin, createNotice)
router.put('/notices/:id', requireAdmin, updateNotice)
router.delete('/notices/:id', requireAdmin, deleteNotice)

// Gallery management
router.get('/gallery', requireAdmin, getGallery)
router.post(
  '/gallery',
  requireAdmin,
  upload.single('image'),
  uploadGalleryPhoto
)

// Website Image Manager
router.get(
  '/website-images',
  requireAdmin,
  getWebsiteImages
)

router.post(
  '/website-images/:page/:imageKey',
  requireAdmin,
  upload.single('image'),
  replaceWebsiteImage
)

router.delete('/gallery/:id', requireAdmin, deleteGalleryPhoto)

export default router