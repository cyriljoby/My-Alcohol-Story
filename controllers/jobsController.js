import Job from '../models/Job.js'
import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
import moment from 'moment'
import Reply from '../models/Reply.js'
import SubReply from '../models/SubReply.js'
const createJob = async (req, res) => {
  
  const { title, story,createdBy } = req.body
  const queryObject = {
    createdBy:createdBy

  }
  console.log(req.body)
  let result = Job.find(queryObject)
  const jobs = await result
  console.log(jobs)
  let createdAt=jobs.slice(-1)[0]["createdAt"] 
  console.log(createdAt)
  let now=(new moment.utc)
  let diff=now.diff(createdAt);
  const diffDuration = moment.duration(diff);
  let word='minutes'
  console.log(diffDuration.seconds())
  if (diffDuration.minutes()==1){
    word='minute'
  }
  if (diffDuration.minutes()<5){
    throw new BadRequestError(`Please wait 5 minutes before you post another story.It has been ${diffDuration.minutes()} ${word} since your last story.`)
  }
  console.log(diffDuration.seconds())

  if (!title || !story) {
    throw new BadRequestError('Please provide all values')
  }
  req.body.createdBy = req.user.userId
  // console.log(req.body)
  const job = await Job.create(req.body)
  // console.log(job)
  
  res.status(StatusCodes.CREATED).json( req.body )
}

const createReply = async (req, res) => {
  try {
    const { reply, storyId,createdBy } = req.body
    const replyOut = await Reply.create(req.body)
  
    res.status(StatusCodes.CREATED).json( req.body )
    
  } catch (error) {
  }

}

const createSubReply = async (req, res) => {
  try {
    const { subreply, replyId,createdByReplyId,createdBy } = req.body
    console.log(createdByReplyId)
  
    const replyOut = await SubReply.create(req.body)
  
    res.status(StatusCodes.CREATED).json( req.body )
    
  } catch (error) {
    console.log(req.body)
    console.log(error)
  }

}

const getAllJobs = async (req, res) => {
  // console.log(req.query)
  const {sort, search } = req.query

  const queryObject = {

  }
  // add stuff based on condition
  if (search) {
    queryObject.title = { $regex: search, $options: 'i' }
  }
  // NO AWAIT

  let result = Job.find(queryObject)

  // chain sort conditions

  if (sort === 'latest') {
    result = result.sort('-createdAt')
  }

  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit


  const jobs = await result
  const totalJobs = await Job.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalJobs / limit)


  let Userresult = User.find()
  
  let Replyresult=Reply.find()

  let SubReplyResult=SubReply.find()

 


  const users = await Userresult

  const replies= await Replyresult

  const subreplies= await SubReplyResult

  res.status(StatusCodes.OK).json({ users,jobs,replies,subreplies})
}




const updateJob = async (req, res) => {
  const { id: jobId } = req.params
  const { story, title } = req.body

  if (!title || !story) {
    throw new BadRequestError('Please provide all values')
  }
  const job = await Job.findOne({ _id: jobId })

  if (!job) {
    throw new NotFoundError(`No job with id :${jobId}`)
  }
  // check permissions

  checkPermissions(req.user, job.createdBy)

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(StatusCodes.OK).json({ updatedJob })
}
const deleteJob = async (req, res) => {
  const { id: jobId } = req.params

  const job = await Job.findOne({ _id: jobId })

  const replies=await Reply.find({storyId:jobId})
  for (let i=0;i<replies.length;i++){
    let reply=(replies[i])
    let replyId=reply["_id"]
    const subreplies=await SubReply.find({replyId:replyId})
    await reply.remove()
    for (let i=0;i<subreplies.length;i++){
      let sub=(subreplies[i])
      await sub.remove()
    }
  }
  if (!job) {
    throw new NotFoundError(`No job with id :${jobId}`)
  }

  checkPermissions(req.user, job.createdBy)

  await job.remove()

  // await replies.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' })
}
const deleteReply = async (req, res) => {
  const { id: replyId } = req.params
  const subreplies=await SubReply.find({replyId:replyId})
  for (let i=0;i<subreplies.length;i++){
    let sub=(subreplies[i])
    await sub.remove()
  }

  const reply = await Reply.findOne({ _id: replyId })

  if (!reply) {
    throw new NotFoundError(`No job with id :${replyId}`)
  }

  // checkPermissions(req.user, job.createdBy)

  await reply.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' })
}

const deleteSubReply = async (req, res) => {
  const { id: replyId } = req.params

  const reply = await SubReply.findOne({ _id: replyId })

  if (!reply) {
    throw new NotFoundError(`No job with id :${replyId}`)
  }

  // checkPermissions(req.user, job.createdBy)

  await reply.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' })
}

const deleteReplybyStory = async (req, res) => {
  const { storyId: storyId } = req.params
  const reply = await Reply.findOne({ storyId: storyId })
  if (!reply) {
    throw new NotFoundError(`No job with id :${storyId}`)
  }

  // checkPermissions(req.user, job.createdBy)

  await reply.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' })
}

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ])
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  }

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ])
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y')
      return { date, count }
    })
    .reverse()

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}

export { deleteSubReply,createJob, deleteJob, getAllJobs, updateJob, showStats,createReply, deleteReply, deleteReplybyStory,createSubReply }
