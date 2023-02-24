const jwt=require('jsonwebtoken')
const User=require('../models/user.js')


const auth=async(req,res,next)=>{
	try{
		const token=req.header('Authorization').replace('Bearer ','')
		console.log(token)
		const decoded=jwt.verify(token,'thisisthat')
		console.log(decoded)
		const user=await User.findOne({_id:decoded._id,'tokens.token':token})
		console.log(user)
		if(!user){
			throw new Error()
		}
		req.user=user
		next()
	}
	catch(e){
		res.status(400).send({error:'please authenticate'})
	}
}
module.exports=auth