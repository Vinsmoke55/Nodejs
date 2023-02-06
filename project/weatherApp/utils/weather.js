const request=require('request')

var weatherReport=(latitude,longitude,callback)=>{
		const URL="http://api.weatherstack.com/current?access_key=0eabdf865a795131eff89ba1511c0baa&query="+latitude+","+longitude;

		request({url:URL,json:true},(error,response)=>{
			if(error){
				callback("error occured",undefined);
			}
			else if(response.body.error){
				callback(undefined,"data error occured");
			}
			else{
				callback(undefined,'the temperature is '+response.body.current.temperature+' and there is '+response.body.current.precip+'% of raining');
			}
		})
}
module.exports=weatherReport;