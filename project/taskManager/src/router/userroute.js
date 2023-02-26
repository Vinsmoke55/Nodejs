const express=require('express')
const User=require('../models/user.js')
const auth=require('../middleware/auth.js')
const router=new express.Router()

//resource creating endpoint for user
router.post('/user',async(req,res)=>{
	const user=new User(req.body)	//creating a new user which is send from the postman and saving to the database

	try{
		await user.save()
		const token=await user.generateAuthToken()	//generating token when user is created
		res.status(201).send({user,token})
	}
	catch(e){
		res.status(400).send(e)
	}
})

router.post('/user/login',async (req,res)=>{
	try{
		const user=await User.findByCredentials(req.body.email,req.body.password)
		const token=await user.generateAuthToken()			//generating token when user login
		res.send({user,token})
	}
	catch(e){
		res.status(400).send(e)
	}
})

router.post('/user/logout',auth,async(req,res)=>{		//logout removes only the current generated token
	try{
		req.user.tokens=req.user.tokens.filter((token)=>{
			return token.token!=req.token
		})
		await req.user.save()
		res.send()
	}
	catch(e){
		res.status(500).send()
	}
})

router.post('/user/logoutall',auth,async(req,res)=>{		//logout of all session remove all the tokens
	try{
		req.user.tokens=[]
		await req.user.save()
		res.send()
	}
	catch(e){
		res.status(500).send()
	}
})

//resource reading endpoint for user
router.get('/user/me',auth,async(req,res)=>{		//setting up middleware function for a specific route
	res.send(req.user)
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