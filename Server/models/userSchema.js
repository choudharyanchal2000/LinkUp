const mongoose= require('mongoose')
const jwt=require('jsonwebtoken')
const validator=require('validator')
const bcrypt=require('bcrypt')


const userSchema=new mongoose.Schema({
    name:{
        type:String,
       
        require:true,
        minLength:[3,"Name must contain at least 3 character"],
        maxLength:[30,"Name cannot exced 30 characters"]
    },
    email:{
        type:String,
        require:true,
       validate:[validator.isEmail,"Please provide valid email"]
    },
    phone:{
        type:Number,
        require:true,
      
    },
    address:{
        type:String,
        require:true,
       
    },
    niches:{
        firstNiche:String,
        secondNiche:String,
        thirdNiche:String,
        
    },
    password:{
        type:String,
        require:true,
        minLength:[5,"Password must contain at least 3 character"],
        maxLength:[30,"Password cannot exced 30 characters"]
    },

    resume:{
        public_id: String,
        url: String,
        
    },
    coverLetter:{
        type:String,
       
    },
    role:{
        type:String,
        require:true,
        enum:["Job Seeker","Employer"]
       
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    
})

userSchema.pre("save",async function (next) {

    if (!this.isModified("password")) {
        next()
    }
    this.password=await bcrypt.hash(this.password,10)
})

 userSchema.methods.comparePassword= async function (enteredPassword) {
     return await bcrypt.compare(enteredPassword,this.password)
 }

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRE})
}

 



const User =mongoose.model("user",userSchema)

module.exports=User