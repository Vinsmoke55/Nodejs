require('../src/db/mongoose.js')
const Task=require('../src/models/task.js')

// Task.findByIdAndRemove('63eb57e4db4c4b985fd9222f').then((user)=>{
// 	console.log(user)
// 	return Task.countDocuments({completed:false})
// }).then((result)=>{
// 	console.log(result)
// }).catch((e)=>{
// 	console.log(e)
// })

const removeAndCount=async(id)=>{
	const remove=await Task.findByIdAndRemove(id)
	const count=await Task.countDocuments({completed:false})
	return count
}

removeAndCount('63eb57e4db4c4b985fd9222f').then((result)=>{
	console.log(result)
}).catch((e)=>{
	console.log(e)
})

