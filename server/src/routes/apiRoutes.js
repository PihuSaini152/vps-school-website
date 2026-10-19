import { Router } from 'express'
import { getHealth } from '../controllers/healthController.js'
import { createEnquiry } from '../controllers/enquiryController.js'
import { getNotices } from '../controllers/noticesController.js'
const router=Router()
router.get('/health',getHealth)
router.get('/notices',getNotices)
router.post('/enquiries',createEnquiry)
export default router
