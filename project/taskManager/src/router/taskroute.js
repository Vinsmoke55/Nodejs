const express=require('express')
const Task=require('../models/task.js')
const router=new express.Router()

//resource creating endpoint for task
router.post('/task',async(req,res)=>{
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
router.get('/task',async(req,res)=>{

	try{
		const tasks=await Task.find({})
		res.status(200).send(tasks)
	}
	catch(e){
		res.status(500).send(e)
	}
})

//resource reading enpoint by id for task
router.get('/task/:id',async(req,res)=>{
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
router.patch('/task/:id',async(req,res)=>{
	const updates=Object.keys(req.body)
	const allowedUpdates=['description','completed']
	const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
	if(!isValidOperation){
		return res.status(400).send({error:'invalid update'})
	}
	try{
		const task=await Task.findById(req.params.id)
		updates.forEach((update)=>task[update]=req.body[update])
		await task.save()
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
router.delete('/task/:id',async(req,res)=>{
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

module.exports=router