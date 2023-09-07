import express from 'express'
const replyRouter = express.Router()

import {
  createReply, deleteReply,createSubReply,deleteSubReply
} from '../controllers/storyController.js'

import rateLimiter from 'express-rate-limit'
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes',
})

replyRouter.route('/').post(createReply).get()
replyRouter.route('/sub').post(createSubReply)
replyRouter.route('/:id').delete(deleteReply)
replyRouter.route('/sub/:id').delete(deleteSubReply)
export default replyRouter
