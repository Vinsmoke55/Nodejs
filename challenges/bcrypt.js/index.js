//bcryptjs is a package that is used to hash the password
const bcrypt=require('bcryptjs')

const func=async()=>{
	const password='ank1234'		
	const hashedPassword= await bcrypt.hash(password,8)		//it returns promise and takes first parameter text which we want to hash and another is no of round

	console.log(password)
	console.log(hashedPassword)

	const comparePassword= await bcrypt.compare(password,hashedPassword)
	console.log(comparePassword)
}

func()