import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema(
  {
    users: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    latestMessage: {
      type: mongoose.Types.ObjectId,
      ref: 'Message',
    }
  },
  { timestamps: true }
)

export default mongoose.model('Chat', ChatSchema)