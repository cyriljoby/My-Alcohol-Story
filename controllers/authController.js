import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'
import validator from "validator";


const register = async (req, res) => {
  let {  email, password, alias,image } = req.body
  if (!email || !password || !alias) {
    throw new BadRequestError('please provide all values')
  }
  const userAlreadyExists = await User.findOne({ email })
  const aliasAlreadyExists=await User.findOne({ alias })
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use')
  }

  if (aliasAlreadyExists) {
    throw new BadRequestError('Alias already in use')
  }
  const user = await User.create({ email, password, alias})
  const userId=await User.findOne({email})
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({
    user: {
      _id:userId["_id"],
      email: user.email,
      alias: user.alias,
      image: user.image,  
      popup:false,
      token  },
    token,
  })
}
const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide all values')
  }
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }
  const token = user.createJWT()
  user.password = undefined
  res.status(StatusCodes.OK).json({ user, token })
}
const updateUser = async (req, res) => {
  // console.log(req.body)
  const { email, alias, image, userId, navigateName } = req.body
  
  
  const aliasAlreadyExists=await User.findOne({ alias })
  console.log("Alias already: " + aliasAlreadyExists)
  console.log("userid " + userId)
  

  if (!email || !alias) {
    throw new BadRequestError('Please provide all values')
  }
  if (aliasAlreadyExists &&  aliasAlreadyExists._id!=userId ){
    throw new BadRequestError("Alias already in use")
 }
  const user = await User.findOne({ _id: req.user.userId })

  user.email = email
  user.alias = alias
  user.image= image

  await user.save()

  const token = user.createJWT()

  res.status(StatusCodes.OK).json({ user, token })
}

const closePopup = async (req, res) => {
  console.log(req.body.userId)
  const user = await User.findOne({ _id: req.body.userId })
  user.popup = true
  await user.save()
  console.log(user)
  res.status(StatusCodes.OK).json({ user })
}

export { register, login, updateUser, closePopup }
