const express = require('express');
const { isAuthenticated, isAuthorized } = require('../middleware/auth');
const { employerGetAllApplication, postApplication, jobSeekerGetAllApplication, deleteApplication } = require('../controllers/applicationController');

const router = express.Router()


router.post("/post/:id", isAuthenticated, isAuthorized("Job Seeker"), postApplication);
router.get("/employer/getall", isAuthenticated, isAuthorized("Employer"), employerGetAllApplication);
router.get("/jobseeker/getall", isAuthenticated, isAuthorized("Job Seeker"), jobSeekerGetAllApplication);
router.delete("/delete/:id", isAuthenticated, deleteApplication);

module.exports = router