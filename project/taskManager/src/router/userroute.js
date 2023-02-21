const express=require('express')
const User=require('../models/user.js')
const router=new express.Router()

//resource creating endpoint for user
router.post('/user',async(req,res)=>{
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
router.get('/user',async(req,res)=>{		//finding all the users and sending as the response

	try{
		const users=await User.find({})
		res.status(200).send(users)
	}
	catch(e){
		res.status(500).send(e)
	}

})

//resource reading endpoint by id for user
router.get('/user/:id',async(req,res)=>{		//adding a dynamic parameter id
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
router.patch('/user/:id',async(req,res)=>{
	//this is for the update which do not match the field eg height:20
	const updates=Object.keys(req.body)
	const allowedUpdates=['name','email','password','age']
	const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
	if(!isValidOperation){
		return res.status(400).send({error:'invalid update'})
	}

	//update the user with the id 
	try{
		const user=await User.findById(req.params.id)
		updates.forEach((update)=>user[update]=req.body[update])
		await user.save()
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
router.delete('/user/:id',async(req,res)=>{
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

module.exports=router