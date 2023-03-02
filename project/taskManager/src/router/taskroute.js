const express=require('express')
const Task=require('../models/task.js')
const auth=require('../middleware/auth.js')
const router=new express.Router()

//resource creating endpoint for task
router.post('/task',auth,async(req,res)=>{
	const task=new Task({
		...req.body,
		owner:req.user._id
	})
	try{
		await task.save()
		res.status(201).send(task)
	}
	catch(e){
		res.status(400).send(e)
	}
})

//resource reading enpoint for task
router.get('/task',auth,async(req,res)=>{

	try{
		await req.user.populate('tasks')
		res.status(200).send(req.user.tasks)
	}
	catch(e){
		res.status(500).send(e)
	}
})

//resource reading enpoint by id for task
router.get('/task/:id',auth,async(req,res)=>{
	const _id=req.params.id;

	try{
		const task=await Task.findOne({_id,owner:req.user._id})
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
router.patch('/task/:id',auth,async(req,res)=>{
	const updates=Object.keys(req.body)
	const allowedUpdates=['description','completed']
	const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
	if(!isValidOperation){
		return res.status(400).send({error:'invalid update'})
	}
	try{
		const task=await Task.findOne({id:req.params.id,owner:req.user._id})

		if(!task){
			return res.send(404).send()
		}

		updates.forEach((update)=>task[update]=req.body[update])
		await task.save()
		res.send(task)
	}
	catch(e){
		res.status(500).send(e)
	}
})

//resource deleting endpoint for task
router.delete('/task/:id',auth,async(req,res)=>{
	try{
		const task=await Task.findOneAndDelete({id:req.params.id,owner:req.user._id})
		
		if(!task){
			return res.status(404).send()
		}
		res.send(task)
	}
	catch(e){
		res.status(500).send(e)
	}
})

module.exports=router