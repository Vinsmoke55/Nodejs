const path=require('path')
const express=require('express')

const app=express()

app.set('view engine','hbs')

const pathToPublic=path.join(__dirname,'public')	// ../is used to go back in directory
console.log(pathToPublic)
app.use(express.static(pathToPublic))

app.set('view engine','hbs')

app.get('',(req,res)=>{
	res.render('index')
})

app.get('/about',(req,res)=>{
	res.render('about',{title:'about'})
})

app.get('/help',(req,res)=>{
	res.render('help',{title:'help page'})
})



app.listen(3000,()=>{
	console.log('app up and running at port 3000')
})