require('dotenv').config()
const express=require('express')
const cloudinary = require("cloudinary").v2;
 const userRouter=require('./routers/userRouter')
const app=express()
const cors=require('cors')
const cookieParser = require("cookie-parser")
const connectDb = require('./database/connection')

const fileUpload = require('express-fileupload');
const jobRouter=require('./routers/jobRouter')
const applicationRouter=require('./routers/applicationRouter');
const newsLetterAutomation = require('./automation/newsLetterCron');
const {errorMiddleware}=require('./middleware/error-middleware')
  const path=require('path')
 
app.use(fileUpload({
    useTempFiles:true,
  }))

// const corsOptions={
//     origin:process.env.FRONTEND_URL,
//     credentials:true,
//     methods:"GET, POST, PUT, DELETE, PATCH, HEAD"
// }

app.use(cors())
app.use(cookieParser())
//use to check and parse the data
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.resolve(__dirname, "dist")))


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDNARY_API_KEY,
    api_secret:process.env.CLOUDNARY_API_SECRET,
})

app.use("/api/v1/user",userRouter)
app.use("/api/v1/job",jobRouter)

app.use("/api/v1/application",applicationRouter)

app.get('*', (req, res) => res.sendFile(path.resolve('dist', 'index.html')));

 newsLetterAutomation()
app.use(errorMiddleware);

 
const port=process.env.PORT
connectDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is started at port:${port}`);
        })
    })