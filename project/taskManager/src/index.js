const express=require('express')
require('./db/mongoose.js')
const userRouter=require('./router/userroute.js')
const taskRouter=require('./router/taskroute.js')

const app=express()

app.use(express.json())		//this line parse the incoming json 
app.use(userRouter)
app.use(taskRouter)

const port=process.env.PORT||3000

app.listen(3000,()=>{
	console.log('app running at port '+port)
})