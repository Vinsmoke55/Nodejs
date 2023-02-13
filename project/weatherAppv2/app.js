const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geoCode=require('./utils/geocode.js')
const weather=require('./utils/weather.js')

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
})

app.get('/weather',(req,res)=>{
	if(!req.query.address){
		return res.send({
			error:'you must provide the address field at query string'
		})
	}
		//process.agrv aceepts location via the command line argument
	var address=req.query.address
	if(!address){
		console.log('please provide the address')
	}
	else{
		geoCode(req.query.address,(error,{latitude,longitude})=>{	//data is an object so destrcturing it 
		if(error){
			return res.send({error:err})
		}
		weather(latitude,longitude,(error,weatherdata)=>{
		res.send({forcast:weatherdata})
	})
	}) 
	}
})

app.get('/help/*',(req,res)=>{
	res.render('404',{title:'help article not found'})
})

app.get('*',(req,res)=>{
	res.render('404',{title:'404 page not found'})
})


app.listen(3000,()=>{
	console.log('app up and running at port 3000')
})