//defining the model for the user in this file
const mongoose = require('mongoose');
const validator=require('validator');

const Task=mongoose.model('Task',{
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
		type:mongoose.Schema.Types.ObjecId,
		required:true
	}

})

module.exports=Task;