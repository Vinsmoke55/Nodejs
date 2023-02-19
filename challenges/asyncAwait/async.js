// const func=()=>{		//if we donot return anything from the function we get the value undefined

// }
// console.log(func())


// const func=async()=>{		//but if we make the function async then it donot return only undefined
// 							//async function always returns the promise
// }
// console.log(func())


// const func=async()=>{	
// 	// return 'ayush'				//if we return the value then the promise is fullfilled
// 	throw new Error('something went wrong')		//and if we throw error then ther promise is rejected
// }
// func().then((result)=>{
// 	console.log(result)
// }).catch((e)=>{
// 	console.log(e)
// })


//async-await make it easy for promise chainging
const add=(a,b)=>{
	 return new Promise((resolve,reject)=>{
	 	if(a<0||b<0){
	 		return reject('number must be positive')
	 	}

	 	setTimeout(()=>{
		resolve(a+b)
	},2000)
 })
}

const func=async()=>{	
	const sum=await add(1,2)
	const sum2=await add(sum,3)
	// const sum3=await add(sum2,4)
	const sum3=await add(sum2,-5)
	return sum3		
}
func().then((result)=>{
	console.log(result)
}).catch((e)=>{
	console.log(e)
})
