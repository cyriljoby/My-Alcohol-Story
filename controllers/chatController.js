import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

import {BadRequestError} from "../errors/index.js";
import {StatusCodes} from "http-status-codes";

const createChatRoom = async (req, res) => {

  const { recipient, initialMessage  } = req.body
  const userId = req.user.userId

  let user = await User.find({_id:userId})
  let recipientUser = await User.find({_id:recipient})

  if (!user) {
    throw new BadRequestError('Sending user not found')
  }

  if (!recipientUser) {
    throw new BadRequestError('Recipient user not found')
  }

  if (!initialMessage) {
    throw new BadRequestError('Please provide a message')
  }

  try {
    const chat = await Chat.create({
      users: [userId, recipient],
    })

    const message = await Message.create({
      chat: chat._id,
      sender: userId,
      content: initialMessage,
      read: false
    })

    chat.latestMessage = message.content
    await chat.save()

    res.status(StatusCodes.CREATED).json( req.body )
  } catch (error) {
    console.log(error)
    throw new BadRequestError('Unable to create chat room')
  }
}

const createMessage = async (req, res) => {
  const { chatRoomId, content } = req.body
  const userId = req.user.userId

  if (!chatRoomId || !userId || !content) {
    throw new BadRequestError('Please provide all required fields')
  }

  try {
    const message = await Message.create({
      chat: chatRoomId,
      sender: userId,
      content: content,
      read: false,
    })

    const chat = await Chat.findByIdAndUpdate(chatRoomId, {
      latestMessage: message.content,
    })

    res.status(StatusCodes.CREATED).json({ message })
  } catch (error) {
    console.log(error)
    throw new BadRequestError('Unable to create message')
  }
}

const getMessages = async (req, res) => {
  console.log("IN CHAT ROUTE")
  const { recipient } = req.query
  console.log("RECIPIENT: ", recipient)
  const userId = req.user.userId

  if (!recipient || !userId) {
    throw new BadRequestError('Please provide a recipient')
  }

  try {
    const chat = await Chat.findOne({ users: { $all: [userId, recipient] } })
    const messages = await Message.find({ chat: chat._id }).populate('sender')

    res.status(StatusCodes.OK).json({ messages })
  } catch (error) {
    console.log(error)
    throw new BadRequestError('Unable to get messages')
  }
}

const getChatRooms = async (req, res) => {
  const userId = req.user.userId

  if (!userId) {
    throw new BadRequestError('Please provide a user')
  }

  try {
    const chats = await Chat.find({ users: { $in: [userId] } }).populate('users');

    const chatToUnreads = await Promise.all(chats.map(async (chat) => {
      const unreadMessages = await Message.find({ chat: chat._id, read: false, sender: {$ne: userId} }).count();
      return {chat, unreadMessages};
    }));

    res.status(StatusCodes.OK).json({ chatToUnreads })
  } catch (error) {
    console.log(error)
    throw new BadRequestError('Unable to get chat rooms')
  }
}

export {
  createChatRoom,
  createMessage,
  getMessages,
  getChatRooms,
}
