const request=require('request')


const city='kathmandu';


//api to get latitude and longitude using apininjas(geocoding api)
var data=request({url: 'https://api.api-ninjas.com/v1/geocoding?city=' + city,
	headers: {'X-Api-Key': '5qaxvKD2gEZ53oGe/AuzsQ==Z27MXTAXLCECGFz7'},json:true},(error,response)=>{
  	console.log("latitude:"+response.body[0].latitude)
  	console.log("longitude:"+response.body[0].longitude)
})