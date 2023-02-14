
const mongoose = require('mongoose');
const validator=require('validator');

const dbURL='mongodb+srv://ayush:helloworld55@cluster6.nvxaegs.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURL)

const user=mongoose.model('User',{
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
	age:{
		type:Number,
		validate(value){		//if the given value for the age is a negative nuber than it throws error
			if(value<0)
				throw new Error('age should be a positive Number')
		}
	}
})

const me=new user({
	name:'Ayush',
	email:'neupaneayush3@gmail.com',
	age:20

})

me.save().then(()=>{
	console.log('saved')
}).catch((err)=>{
	console.log(err)
})
