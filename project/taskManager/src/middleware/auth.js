const jwt=require('jsonwebtoken')
const User=require('../models/user.js')


const auth=async(req,res,next)=>{
	try{
		const token=req.header('Authorization').replace('Bearer ','')	//middlware function starts by looking for the token in 
		const decoded=jwt.verify(token,'thisisthat')		//verify the token 
		const user=await User.findOne({_id:decoded._id,'tokens.token':token})	//find the user with the id and token 
		if(!user){
			throw new Error()
		}
		req.token=token
		req.user=user
		next()
	}
	catch(e){
		res.status(400).send({error:'please authenticate'})
	}
}
module.exports=auth