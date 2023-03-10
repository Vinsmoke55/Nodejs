//requiring request module
const request=require('request');


//putting the link to acess api in weather stack 
const URL="http://api.weatherstack.com/current?access_key=0eabdf865a795131eff89ba1511c0baa&query=27.7172,85.3240";



// // request take two argument first is url from where data is taken 
// // and second is the function that is called when the data 
// // is got by node
// request({url:URL},(error,response)=>{
// 	const data=JSON.parse(response.body);	//parsing the response and taking body of the respose
// 	console.log(data.current);				//loging the data.current which displays the current weather
// })



//we can also write the above code as follows by giving another option json which automaticall
//parse the data
request({url:URL,json:true},(error,response)=>{
	console.log('the temperature is '+response.body.current.temperature+' and there is '+response.body.current.precip+'% of raining');
	// console.log(response.body);
})

