//using the callback to add city and get its coordinate
const request=require('request')

var geoCode=(city,callback)=>{
	const geocodeURL='https://api.api-ninjas.com/v1/geocoding?city='+city;

	request({url:geocodeURL,headers: {'X-Api-Key': '5qaxvKD2gEZ53oGe/AuzsQ==Z27MXTAXLCECGFz7'},json:true},(error,response)=>{
		if(error){						
			callback("there is eror in the program",undefined)
		}
		else if(response.body.error){	
			callback(undefined,"data error")
		}
		else{
			const data={
				latitude:response.body[0].latitude,
				longitude:response.body[0].longitude
			}
			;
			callback(data)
		}
	})
}


geoCode('kathmandu',(data)=>{
	const URL="http://api.weatherstack.com/current?access_key=0eabdf865a795131eff89ba1511c0baa&query="+data.latitude+","+data.longitude;

request({url:URL,json:true},(error,response)=>{
	if(error){
		console.log("error occured");
	}
	else if(response.body.error){
		console.log("data error occured");
	}
	else{
		console.log('the temperature is '+response.body.current.temperature+' and there is '+response.body.current.precip+'% of raining');
	}
})
})