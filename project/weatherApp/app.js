const geoCode=require('./utils/geocode.js')
const weather=require('./utils/weather.js')

//process.agrv aceepts location via the command line argument
var address=process.argv[2];
if(!address){
	console.log('please provide the address')
}
else{
	geoCode(address,(error,{latitude,longitude})=>{	//data is an object so destrcturing it 
	if(error){
		return console.log(error)
	}
	weather(latitude,longitude,(error,weatherdata)=>{
	console.log(weatherdata)
})
}) 
}
	


	

