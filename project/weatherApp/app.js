const geoCode=require('./utils/geocode.js')
const weather=require('./utils/weather.js')

geoCode('kathmandu',(error,data)=>{
	weather(data.latitude,data.longitude,(error,data)=>{
	console.log(data)
})
})	

	

