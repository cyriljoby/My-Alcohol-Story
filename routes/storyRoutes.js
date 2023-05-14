import express from 'express'
const router = express.Router()
// app.set('trust proxy', 1);
import rateLimiter from 'express-rate-limit'
const apiLimiter = rateLimiter({
  windowMs: 5 * 60 * 1000, //5 minutes
  max: 1,
  message: 'Too many requests from this IP, please try again after 15 minutes',
})

import {
  createStory,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
  createReply,
  createLog
} from '../controllers/storyController.js'

router.route('/').post(createStory).get(getAllJobs)
// router.route('/reply').post(createReply)
router.route('/log').post(createLog)
// remember about :id
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router
