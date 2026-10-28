import { Router } from 'express'

import { getHealth } from '../controllers/healthController.js'
import { createEnquiry } from '../controllers/enquiryController.js'
import { getNotices } from '../controllers/noticesController.js'
import { createJobApplication } from '../controllers/jobController.js'

const router = Router()

router.get('/health', getHealth)
router.get('/notices', getNotices)
router.post('/enquiries', createEnquiry)
router.post('/job-applications', createJobApplication)

export default router