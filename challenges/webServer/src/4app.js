		
const express=require('express')

const app=express()

app.set('view engine','hbs')


app.set('view engine','hbs')

app.get('',(req,res)=>{
	res.render('index.hbs')
})


app.listen(3000,()=>{
	console.log('app up and running at port 3000')
})