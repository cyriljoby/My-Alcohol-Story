import mongoose from 'mongoose'

const SubReplySchema = new mongoose.Schema(
  {
    subreply: {
      type: String,
      required: [true, 'Please provide reply'],
    },
    replyId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    createdByReplyId: {
        type: mongoose.Types.ObjectId,
        required: true
      },
    createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
    }
  },              
  { timestamps: true }
)

export default mongoose.model('SubReply', SubReplySchema)
