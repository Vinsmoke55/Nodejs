//error handiling
const request=require('request')

// const URL="http://api.weatherstack.com/current?access_key=0eabdf865a795131eff89ba1511c0baa&query=27.7172,85.3240";

// request({url:URL,json:true},(error,response)=>{
// 	if(error){
// 		console.log("error occured");
// 	}
// 	else if(response.body.error){
// 		console.log("data error occured");
// 	}
// 	else{
// 		console.log('the temperature is '+response.body.current.temperature+' and there is '+response.body.current.precip+'% of raining');
// 	}
// })

const geocodeURL='https://api.api-ninjas.com/v1/geocoding?city=kathmandu';

request({url:geocodeURL,headers: {'X-Api-Key': '5qaxvKD2gEZ53oGe/AuzsQ==Z27MXTAXLCECGFz7'},json:true},(error,response)=>{
	if(error){						//if there something in error instead of response
		console.log("error occured")
	}
	else if(response.body.error){	//if there is a value in error inside of the body of sent data
		console.log("invalid parameter");
	}
	else{
		const latitude=response.body[0].latitude;
		const longitude=response.body[0].longitude;
		console.log(latitude,longitude)
	}
})