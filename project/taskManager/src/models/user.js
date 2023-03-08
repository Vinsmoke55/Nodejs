//defining the model for the user in this file
const mongoose = require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Task=require('./task.js')


const userSchema=mongoose.Schema({		//creating a schema
	name:{
		type:'string',
		required:true,		//this makes the name field required 
		lowercase:true		//this makes the given data to the lowecase
	},
	email:{
		type:'string',
		trim:true,			//it removes the emptyspaces
		required:true,
		validate(value){
			if(!validator.isEmail(value)){
				throw new Error('invalid email')
			}
		}
	},
	password:{
		type:'string',
		required:true,
		minlength:5,		//this makes password to be more then 5 lenght
		trim:true,
		validate(value){
			if(value=='password'){	//this will throw errr if password is a string password 
				throw new Error('passowrd error')
			}
		}
	},
	age:{
		type:Number,
		validate(value){		//if the given value for the age is a negative nuber than it throws error
			if(value<0)
				throw new Error('age should be a positive Number')
		}
	},
	tokens:[{
		token:{
			type:String,
			required:true
		}
	}],
	avatar:{			//to add image
		type:Buffer
	}
},{
	timestamps:true			//adding the timestamps to the database to show date created and updated
})

userSchema.virtual('tasks',{
	ref:'Task',
	localField:'_id',
	foreignField:'owner'
})

userSchema.methods.toJSON=function(){	//hiding the private inforamation
	const user=this
	const userObject=user.toObject() //creating an object so we can manipulate
	delete userObject.password
	delete userObject.tokens
	delete userObject.avatar
	return userObject
}

userSchema.methods.generateAuthToken=async function(){		//creating method for generating a token
	const user=this
	const token=await jwt.sign({_id:user.id.toString()},'thisisthat')
	user.tokens=await user.tokens.concat({token})
	user.save()
	return token
}

userSchema.statics.findByCredentials=async(email,password)=>{
	const user=await User.findOne({email})
	if(!user){
		throw new Error('unable to login')
	}
	const isMatch=await bcrypt.compare(password,user.password)
	if(!isMatch){
		throw new Error('unable to login')
	}
	return user
}

//hashing the password before saving and udating
userSchema.pre('save',async function(next){		//pre for before event and post for after event
	const user=this
	if(user.isModified('password')){
		user.password= await bcrypt.hash(user.password,8)
	}
	next()

})	

//delete tasks when user is deleted
userSchema.pre('remove',async function(next){
	const user=this
	Task.deleteMany({owner:user._id})
	next()
})

const User=mongoose.model('User',userSchema)

module.exports=User;