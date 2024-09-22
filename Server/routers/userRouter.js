const express= require('express')
const { register, login, logout, getUser, updateProfile, updatePassword } = require('../controllers/userController')
const { isAuthenticated } = require('../middleware/auth')

const router=express.Router()

router.post('/register',register)
router.post('/login',login)
router.get("/logout",isAuthenticated,logout)
router.get("/getuser",isAuthenticated,getUser)
router.put("/update/profile",isAuthenticated,updateProfile)
router.put("/update/password",isAuthenticated,updatePassword)

module.exports=router