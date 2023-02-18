const express=require('express')
require('./db/mongoose.js')
const User=require('./models/user.js')
const Task=require('./models/task.js')

const app=express()

app.use(express.json())		//this line parse the incoming json 

const port=process.env.PORT||3000

app.post('/user',(req,res)=>{
	const user=new User(req.body)	//creating a new user which is send from the postman and saving to the database

	user.save().then(()=>{
		res.status(201).send(user)	//201 status code means created
	}).catch((err)=>{
		res.status(400).send(err)		//we can change the satus code using .status
	})
	
})

app.post('/task',(req,res)=>{
	const task=new Task(req.body)	//creating a new user which is send from the postman and saving to the database

	task.save().then(()=>{
		res.status(201).send(task)
	}).catch((err)=>{
		res.status(400).send(err)		//we can change the satus code using .status
	})
	
})

app.get('/user',(req,res)=>{		//finding all the users and sending as the response
	User.find({}).then((users)=>{
		res.status(200).send(users)
	}).catch(()=>{
		res.status(500).send()
	})
})

app.get('/user/:id',(req,res)=>{		//adding a dynamic parameter id
	const _id=req.params.id;			//we can get the dynamic parameter by using params which is an object
	User.findById(_id).then((user)=>{
		if(!user){
			res.status(500).send()
		}
		res.status(200).send(user)
	}).catch((e)=>{
		res.status(500).send(e)
	})
})

app.listen(3000,()=>{
	console.log('app running at port '+port)
})