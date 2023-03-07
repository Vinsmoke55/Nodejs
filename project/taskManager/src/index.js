const express=require('express')
require('./db/mongoose.js')
const userRouter=require('./router/userroute.js')
const taskRouter=require('./router/taskroute.js')

const app=express()

app.use(express.json())		//this line parse the incoming json 
app.use(userRouter)			//using user router
app.use(taskRouter)			//using task router

const port=process.env.PORT||3000

//file uploads using multer
const multer=require('multer')

const avatar=multer({
	dest:'images'
})

app.post('/upload',avatar.single('upload'),(req,res)=>{
	res.send()
})




app.listen(port,()=>{
	console.log('app running at port '+port)
})


