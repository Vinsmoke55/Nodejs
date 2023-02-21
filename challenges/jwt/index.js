//json web token
const jwt=require('jsonwebtoken')

const func=async()=>{
	const token=jwt.sign({_id:1000},'secretKey',{expiresIn:'7 days'})	//it is used to assign a token to the id second parameter is secret key and third is exp
	// console.log(token)
	const data=jwt.verify(token,'secretKey')	//it is used to verify the token by taking the secret key taken at the time of assigning
	console.log(data)
}
func()