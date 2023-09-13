import mongoose from 'mongoose'

const SavesSchema = new mongoose.Schema(
  {
    savedId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
      },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    }
  },              
  { timestamps: true }
)

export default mongoose.model('Saves', SavesSchema)