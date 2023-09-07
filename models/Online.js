import mongoose from 'mongoose'

const OnlineSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
  socketId: {
    type: String,
    required: [true, 'Please provide socketId'],
  }
})

export default mongoose.model('Online', OnlineSchema)