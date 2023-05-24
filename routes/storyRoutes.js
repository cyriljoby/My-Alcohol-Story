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
  deleteSave,
  createLog,
  updateLog,
  deleteLog,
  addSave,
  getSaves,
} from '../controllers/storyController.js'

router.route('/').post(createStory).get(getAllJobs)
router.route('/save').post(addSave)
router.route('/save/:id').delete(deleteSave)
router.route('/getSave').post(getSaves)
router.route('/log').post(createLog)
router.route('/log/:id').patch(updateLog).delete(deleteLog)
// remember about :id
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router
