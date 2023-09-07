import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Types.ObjectId,
      ref: 'Chat',
      required: [true, 'Please provide chat'],
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide sender'],
    },
    content: {
      type: String,
      required: [true, 'Please provide text'],
    },
    read: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
)

export default mongoose.model('Message', MessageSchema)