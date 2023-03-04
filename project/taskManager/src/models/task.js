//defining the model for the user in this file
const mongoose = require('mongoose');
const validator=require('validator');

const taskSchema=mongoose.Schema({
	description:{
		type:'string',
		required:true,
		trim:true
	},
	completed:{
		type:Boolean,
		default:false
	},
	owner:{
		type:mongoose.Schema.Types.ObjectId,
		required:true,
		ref:'User'
	}


},{
	timestamps:true		//adding the timestamps to the database to show date created and date updated
})

const Task=mongoose.model('Task',taskSchema)

module.exports=Task;