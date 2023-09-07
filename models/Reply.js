import mongoose from 'mongoose'

const ReplySchema = new mongoose.Schema(
  {
    reply: {
      type: String,
      required: [true, 'Please provide reply'],
    },
    storyId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
      },
  },              
  { timestamps: true }
)

export default mongoose.model('Reply', ReplySchema)
