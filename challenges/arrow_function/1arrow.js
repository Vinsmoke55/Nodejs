// //simple function
// var square=function(x){
// 	return x*x;
// }

// //standard arrow function 
// var square=(x)=>{
// 	return x*x;
// }

// //shorthand version of arrow function
// var square=(x)=>x*x;

// console.log(square(8));

//arrow function do not bind their own this syntax
var event={

	name:'hello',
	
	// printName:function(){		//this works
	// 	console.log('ayush said '+this.name)
	// }

	// printName:()=>{					//this doesnot work
	// 	console.log('ayush said'+this.name)
	// }

	printName() {					//to resolve above arrow function this own is brought
		console.log('ayush said '+this.name);
	}
}

event.printName();