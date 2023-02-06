const request=require('request')

var geoCode=(city,callback)=>{
	const geocodeURL='https://api.api-ninjas.com/v1/geocoding?city='+city;

	request({url:geocodeURL,headers: {'X-Api-Key': '5qaxvKD2gEZ53oGe/AuzsQ==Z27MXTAXLCECGFz7'},json:true},(error,response)=>{
		if(error){						
			callback("there is eror in the program",undefined)
		}
		else if(response.body.error){	
			callback("data error",undefined)
		}
		else{
			const data={
				latitude:response.body[0].latitude,
				longitude:response.body[0].longitude
			}
			;
			callback(undefined,data)
		}
	})
}
module.exports=geoCode;