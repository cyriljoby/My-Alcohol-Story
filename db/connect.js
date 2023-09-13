import mongoose from 'mongoose'

const connectDB = (url,user,password) => {
  return mongoose.connect(url, {

    "user":user,
    "pass":password,
    "authSource":"admin"

})
}
export default connectDB
// npm 