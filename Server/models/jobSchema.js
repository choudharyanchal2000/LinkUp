const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
   title: {
      type: String,
      reqired: true
   },
   jobType: {
      type: String,
      reqired: true,
      enum: ["Full-time", "Part-time"]
   },
   location: {
      type: String,
      reqired: true
   },
   companyName: {
      type: String,
      reqired: true
   },
   introduction: {
      type: String,

   },
   responsibilities: {
      type: String,
      reqired: true
   },
   qualifications: {
      type: String,
      reqired: true
   },
   offers: {
      type: String,
   },
   salary: {
      type: String,
      reqired: true
   },
   hiringMultipleCandidates: {
      type: String,
      default: "No",
      enum: ["Yes", "No"]
   },
   personalWebsite: {
      title: String,
      url: String
   },
   jobNiche: {
      type: String,
      reqired: true
   },
   newsLettersSent: {
      type: Boolean,
      default: false
   },
   jobPostedOn: {
      type: Date,
      default: Date.now
   },
   postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      reqired: true
   },
})





const Job = mongoose.model("Job", jobSchema)


module.exports = Job