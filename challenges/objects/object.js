// //object property shorthand

// const name='ayush'
// const age=20
// const address='bafal'

// const personInfo={
// 	name,			//if the property is made with the same name as variable than this shorthand can be used
// 	age,
// 	palce:address
// }
// console.log(personInfo)



//object destructuring

const shoplist={
	name:'chocolate',
	price:50,
	stock:100,
}

// const {name:brand,price,stock=50}=shoplist

// console.log(brand)
// console.log(price)
// console.log(stock)

const shop=(type,{name:brand,price,stock})=>{
	console.log(type)
	console.log(brand)
	console.log(price)
	console.log(stock)
}
shop('order',shoplist)