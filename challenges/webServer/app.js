const path=require('path')
const express=require('express')
const hbs=require('hbs')

const app=express()

//define path for express config
const viewsFilePath=path.join(__dirname,'template/view')
const pathToPublic=path.join(__dirname,'public')	// ../is used to go back in directory
const pathToPartials=path.join(__dirname,'template/partials')

//setup handlebars
app.set('view engine','hbs')
app.set('views',viewsFilePath)

//setup static files
hbs.registerPartials(pathToPartials)
app.use(express.static(pathToPublic))


app.get('',(req,res)=>{
	res.render('index.hbs')
})

app.get('/about',(req,res)=>{
	res.render('about',{title:'about'})
})

app.get('/help',(req,res)=>{
	res.render('help',{title:'help page'})
	console.log(req.url)
})

app.get('/weather',(req,res)=>{
	if(!req.query.address){
		return res.send({
			error:'you must provide the address field at query string'
		})
	}
	res.send({
		address:req.query.address
	})
})
//if the route is not found before wildcard character 
//then this route is displayed

app.get('/help/*',(req,res)=>{
	res.render('404',{title:'help article not found'})
})

app.get('*',(req,res)=>{
	res.render('404',{title:'404 page not found'})
})


app.listen(3000,()=>{
	console.log('app up and running at port 3000')
})