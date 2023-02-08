const path=require('path')
const express=require('express')

const app=express()

//define path for express config
const viewsFilePath=path.join(__dirname,'template')
const pathToPublic=path.join(__dirname,'public')	// ../is used to go back in directory
console.log(pathToPublic)

//setup handlebars
app.set('view engine','hbs')
app.set('views',viewsFilePath)

//setup static files
app.use(express.static(pathToPublic))


app.get('',(req,res)=>{
	res.render('index')
})

app.get('/about',(req,res)=>{
	res.render('about',{title:'about'})
})

app.get('/help',(req,res)=>{
	res.render('help',{title:'help page'})
	console.log(req.url)
})



app.listen(3000,()=>{
	console.log('app up and running at port 3000')
})