import mongoose from 'mongoose'

const StorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide title'],
      maxlength: 50,
    },
    story: {
      type: String,
      required: [true, 'Please provide story'],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    }
  },              
  { timestamps: true }
)

export default mongoose.model('Story', StorySchema)
