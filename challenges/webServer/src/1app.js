const express=require('express')

const app=express()

app.get('',(req,res)=>{
	res.send('Hello Express')
})
app.get('/help',(req,res)=>{
	res.send('help page')
})
app.get('/about',(req,res)=>{
	res.send('about page')
})
app.get('/weather',(req,res)=>{
	res.send('weather info page')
})


app.listen(3000,()=>{
	console.log('app up and running on port 3000')
})