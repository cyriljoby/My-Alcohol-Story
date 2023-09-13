import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema(
  {
    users: {
      type: [mongoose.Types.ObjectId],
      ref: 'User',
      required: [true, 'Please provide users'],
    },
    latestMessage: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
)

export default mongoose.model('Chat', ChatSchema)