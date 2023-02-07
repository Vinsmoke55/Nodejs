const express=require('express')

const app=express()

app.get('/about',(req,res)=>{
	res.send('<h1>HTML</h1>')
})

app.get('/weather',(req,res)=>{
	const weatherInfo={
		forcast:'rainy',
		location:'kathmandu'
	}
	res.send(weatherInfo)
})

app.listen(3000,()=>{
	console.log('app up and running at port 3000')
})