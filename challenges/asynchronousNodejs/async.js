//example of asynchronous code
console.log('starting')

setTimeout(()=>{
	console.log('two second have passed')
},2000);

setTimeout(()=>{
	console.log('zero second have passed')
},0);

console.log('stopping')


//learned about the call stack , call back queue and event loop
//and how this aynchronous code run 
//first of all the main function is returned 
//and only after that thd callback queue turns come so 
//first of all starting is printed the stopping then zero sec and two second