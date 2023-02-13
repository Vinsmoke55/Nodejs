const request=require('request')

var weatherReport=(latitude,longitude,callback)=>{
		const URL="http://api.weatherstack.com/current?access_key=0eabdf865a795131eff89ba1511c0baa&query="+latitude+","+longitude;

		request({url:URL,json:true},(error,{body})=>{	//replacing response with body as it is an object
			if(error){
				callback("error occured",undefined);
			}
			else if(body.error){
				callback(undefined,"data error occured");
			}
			else{

				callback(undefined,body.current.weather_descriptions[0]+' .The temperature is '+body.current.temperature+' and there is '+body.current.precip+'% of raining');
				
			}
		})
}
module.exports=weatherReport;


