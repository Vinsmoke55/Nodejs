const express=require('express')
require('./db/mongoose.js')
const userRouter=require('./router/userroute.js')
const taskRouter=require('./router/taskroute.js')

const app=express()

// app.use((req,res,next)=>{		//express middleware
// 	if(req.method==='GET'){
// 		res.send("GET request are currently disabled")
// 	}
// 	else{
// 		next()
// 	}
// })

// app.use((req,res,next)=>{
// 	res.status(503).send('the app is currently under maintainance')
// })

app.use(express.json())		//this line parse the incoming json 
app.use(userRouter)			//using user router
app.use(taskRouter)			//using task router

const port=process.env.PORT||3000

app.listen(3000,()=>{
	console.log('app running at port '+port)
})

const Task=require('./models/task.js')
const User=require('./models/user.js')

const main=async()=>{
	// const task=await Task.findById('63ff3a23d9a46c9049c87591')
	// await task.populate('owner')
	// console.log(task.owner)

	const user=await User.findById('63f8976d034146243e1763da')
	await user.populate('tasks')
	console.log(user.tasks)
}
main()
