////this is a simple function 
// const greet=(name)=>{
// 	console.log('hello'+name)
// }
// greet('ayush')


//this example gives name value undefined 
// const greet=(name)=>{
// 	console.log('hello '+name)
// }

// greet()


//this is the example of default parameter
//if paramerter is given then it use it otherwise uses the default
const greet=(age,name='ank')=>{
	console.log('hello my name is '+name+'.I am '+age+' years old.')
}

greet(20)