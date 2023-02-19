const express=require('express')
require('./db/mongoose.js')
const User=require('./models/user.js')
const Task=require('./models/task.js')

const app=express()

app.use(express.json())		//this line parse the incoming json 

const port=process.env.PORT||3000

app.post('/user',async(req,res)=>{
	const user=new User(req.body)	//creating a new user which is send from the postman and saving to the database

	try{
		await user.save()
		res.status(201).send(user)
	}
	catch(e){
		res.status(400).send(e)
	}
})

app.get('/user',async(req,res)=>{		//finding all the users and sending as the response

	try{
		const users=await User.find({})
		res.status(200).send(users)
	}
	catch(e){
		res.status(500).send(e)
	}

})

app.get('/user/:id',async(req,res)=>{		//adding a dynamic parameter id
	const _id=req.params.id;			//we can get the dynamic parameter by using params which is an object

	try{
		const user=await User.findById(_id)
		if(!user){
			return res.status(500).send()
		}
		res.status(200).send(user)
	}
	catch(e){
		res.status(500).send(e)
	}
})

app.post('/task',async(req,res)=>{
	const task=new Task(req.body)	//creating a new user which is send from the postman and saving to the database
	try{
		await task.save()
		res.status(201).send(task)
	}
	catch(e){
		res.status(400).send(e)
	}
})

app.get('/task',async(req,res)=>{

	try{
		const tasks=await Task.find({})
		res.status(200).send(tasks)
	}
	catch(e){
		res.status(500).send(e)
	}
})

app.get('/task/:id',async(req,res)=>{
	const _id=req.params.id;

	try{
		const task=await Task.findById(_id)
		if(!task){
			return res.status(500).send()
		}
		res.status(200).send(task)
	}
	catch(e){
		res.status(400).send(e)
	}
})

app.listen(3000,()=>{
	console.log('app running at port '+port)
})