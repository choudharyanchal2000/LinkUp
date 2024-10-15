const express= require('express')
const { postJob, getAllJobs, getMyJobs, deleteJob, getASingleJob } = require('../controllers/jobController')
const { isAuthorized,isAuthenticated } = require('../middleware/auth')

const router=express.Router()

router.post('/post',isAuthenticated,isAuthorized("Employer"),postJob)
router.get("/getall", getAllJobs);
router.get("/getmyjobs", isAuthenticated, isAuthorized("Employer"), getMyJobs);
router.delete("/delete/:id", isAuthenticated, isAuthorized("Employer"), deleteJob);
router.get("/get/:id", getASingleJob)

module.exports=router