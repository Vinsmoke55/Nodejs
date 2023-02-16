const express=require('express')

const app=express()

app.use(express.json())

const port=process.env.PORT||3000

app.post('/user',(req,res)=>{
	console.log(req.body)
	res.send('testing')
})

app.listen(3000,()=>{
	console.log('app running at port '+port)
})