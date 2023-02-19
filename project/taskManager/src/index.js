const express=require('express')
require('./db/mongoose.js')
const User=require('./models/user.js')
const Task=require('./models/task.js')

const app=express()

app.use(express.json())		//this line parse the incoming json 

const port=process.env.PORT||3000

//resource creating endpoint for user
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

//resource reading endpoint for user
app.get('/user',async(req,res)=>{		//finding all the users and sending as the response

	try{
		const users=await User.find({})
		res.status(200).send(users)
	}
	catch(e){
		res.status(500).send(e)
	}

})

//resource reading endpoint by id for user
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

//resource updating endpoint for user
app.patch('/user/:id',async(req,res)=>{
	//this is for the update which do not match the field eg height:20
	const updates=Object.keys(req.body)
	const allowedUpdates=['name','email','password','age']
	const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
	if(!isValidOperation){
		return res.status(400).send({error:'invalid update'})
	}

	//update the user with the id 
	try{
		const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
		if(!user){					//if no user with the id is found then return status 404
			return res.status(404).send()
		}
		res.send(user)
	}
	catch(e){
		res.status(500).send(e)
	}
})

//resource deleting endpoint for user
app.delete('/user/:id',async(req,res)=>{
	try{
		const user=await User.findByIdAndDelete(req.params.id)
		if(!user){
			return res.status(404).send()
		}
		res.send(user)
	}
	catch(e){
		res.status(500).send(e)
	}
})

//resource creating endpoint for task
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

//resource reading enpoint for task
app.get('/task',async(req,res)=>{

	try{
		const tasks=await Task.find({})
		res.status(200).send(tasks)
	}
	catch(e){
		res.status(500).send(e)
	}
})

//resource reading enpoint by id for task
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

//resource updating endpoint for task
app.patch('/task/:id',async(req,res)=>{
	const updates=Object.keys(req.body)
	const allowedUpdates=['description','completed']
	const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
	if(!isValidOperation){
		return res.status(400).send({error:'invalid update'})
	}
	try{
		const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
		if(!task){
			return res.send(404).send()
		}
		res.send(task)
	}
	catch(e){
		res.status(500).send(e)
	}
})

//resource deleting endpoint for task
app.delete('/task/:id',async(req,res)=>{
	try{
		const task=await Task.findByIdAndDelete(req.params.id)
		if(!task){
			return res.status(404).send()
		}
		res.send(task)
	}
	catch(e){
		res.status(500).send(e)
	}
})

app.listen(3000,()=>{
	console.log('app running at port '+port)
})