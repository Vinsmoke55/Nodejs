
const mongoose = require('mongoose');

const dbURL='mongodb+srv://ayush:helloworld55@cluster6.nvxaegs.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURL)

const user=mongoose.model('User',{
	name:{
		type:'string'
	},
	age:{
		type:Number
	}
})

const me=new user({
	name:'ayush',
	age:20

})

me.save().then(()=>{
	console.log('saved')
}).catch(()=>{
	console.log('failed')
})


