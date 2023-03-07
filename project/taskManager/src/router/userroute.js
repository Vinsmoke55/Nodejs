const express=require('express')
const User=require('../models/user.js')
const auth=require('../middleware/auth.js')
const multer=require('multer')
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

//resource updating endpoint for user
router.patch('/user/me',auth,async(req,res)=>{
	//this is for the update which do not match the field eg height:20
	const updates=Object.keys(req.body)
	const allowedUpdates=['name','email','password','age']
	const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
	if(!isValidOperation){
		return res.status(400).send({error:'invalid update'})
	}

	//update the user with the id 
	try{
		updates.forEach((update)=>req.user[update]=req.body[update])
		await req.user.save()
		res.send(req.user)
	}
	catch(e){
		res.status(500).send(e)
	}
})

//resource deleting endpoint for user
router.delete('/user/me',auth,async(req,res)=>{
	try{
		req.user.remove()
		res.send(req.user)
	}
	catch(e){
		res.status(500).send(e)
	}
})


//file upload using multer
const upload=multer({
	dest:'avatars',
	limits:{
		fileSize:1000000		//limiting file size to one mb
	},
	fileFilter(req,file,cb){
		if(!file.originalname.match('\.(jpg|jpeg|png)')){	//taking file with extension jpg jpeg and png only
			return cb(new Error('please upload an image'))
		}
		cb(undefined,true)
	}
})


router.post('/user/me/avatar',upload.single('avatar'),(req,res)=>{
	res.send()
})

module.exports=router