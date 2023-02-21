//defining the model for the user in this file
const mongoose = require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs')

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
	}
})

userSchema.pre('save',async function(next){		//pre for before event and post for after event
	const user=this
	if(user.isModified('password')){
		user.password= await bcrypt.hash(user.password,8)
	}
	next()

})		
const User=mongoose.model('User',userSchema)

module.exports=User;