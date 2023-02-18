require('../src/db/mongoose.js')
const User=require('../src/models/user.js')

User.findByIdAndUpdate('63eb6069200d358ee3687762',{age:50}).then((user)=>{
	console.log(user)
	return User.countDocuments({age:50})
}).then((result)=>{
	console.log(result)
}).catch((e)=>{
	console.log(e)
})