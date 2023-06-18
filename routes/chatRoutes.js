import express from 'express'
const chatRouter = express.Router()

import {
  createChatRoom,
  createMessage,
  getMessages,
  getChatRooms,
} from '../controllers/chatController.js'

import rateLimiter from 'express-rate-limit'
import auth from "../middleware/auth.js";
const apiLimiter = rateLimiter({
  windowMs: 30 * 1000, // 30 seconds
  max: 15,
  message: 'Too many requests from this IP, please try again after 30 minutes',
})

chatRouter.route('/').post(auth, apiLimiter, createChatRoom)
chatRouter.route('/').get(auth, getChatRooms)
chatRouter.route('/message').post(auth, apiLimiter, createMessage)
chatRouter.route('/messages').get(auth, getMessages)

export default chatRouter
