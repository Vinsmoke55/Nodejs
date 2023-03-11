const path=require('path')
const express=require('express')

const app=express()

const pathToPublic=path.join(__dirname,'../public')

app.use(express.static(pathToPublic))

// app.get('',(req,res)=>{
// 	res.send()
// })

app.listen(3000,()=>{
	console.log('app running at port 3000')
})