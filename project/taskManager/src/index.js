const express=require('express')
require('./db/mongoose.js')
const User=require('./models/user.js')

const app=express()

app.use(express.json())		//this line parse the incoming json 

const port=process.env.PORT||3000

app.post('/user',(req,res)=>{
	const user=new User(req.body)	//creating a new user which is send from the postman and saving to the database

	user.save().then(()=>{
		res.send(user)
	}).catch((err)=>{
		res.status(400).send(err)		//we can change the satus code using .status
	})
	
})

app.listen(3000,()=>{
	console.log('app running at port '+port)
})