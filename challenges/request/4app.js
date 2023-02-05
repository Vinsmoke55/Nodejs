//the callback function


// //the down code works because there is not any synchronousr code in the function
// var geocode=(address)=>{
// 	var data={
// 		latitude:0,
// 		longitude:0
// 	}
// 	return data
// }

// const data=geocode('kathmandu')
// console.log(data)



// //but return do not work if there is any synchronous code 
// //so we use callback
// var geocode=(address,callback)=>{
// 	var data={
// 		latitude:0,
// 		longitude:0
// 	}
// 	callback(data)
// }
// geocode('kathmandu',(data)=>{
// 	console.log(data)
// })


//challenge
//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

const add=(a,b,callback)=>{
	setTimeout(()=>{
		data=a+b
		callback (data)
	},2000)
}

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})