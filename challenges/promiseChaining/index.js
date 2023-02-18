//promise
const add=(a,b)=>{
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve(a+b)
		},2000)
	})
}

// add(2,4).then((sum)=>{
// 	console.log(sum)
// }).catch((e)=>{
// 	console.log(e)
// })


// //promise nesting
// //the code becomes more compex as the asynchronous code increases
// //so we use promise chaining

// add(2,4).then((sum)=>{
// 	console.log(sum)
// 	add(sum,4).then((sum2)=>{
// 		console.log(sum2)
// 	}).catch((e)=>{
// 		console.log(e)
// 	})
// }).catch((e)=>{
// 	console.log(e)
// })


//promise chaining
//it have improved syntax
//removes the nested structure
add(2,4).then((sum)=>{
	console.log(sum)
	return add(sum,4)
}).then((sum2)=>{
	console.log(sum2)
}).catch((e)=>{
	console.log(e)
})