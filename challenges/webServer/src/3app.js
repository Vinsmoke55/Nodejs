//serving up static files
const path=require('path')		//path module is core node js module which helps to go to a certain directory
const express=require('express')

const app=express()

console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname,'../public'))

const pathToPublic=path.join(__dirname,'../public')	// ../is used to go back in directory

app.use(express.static(pathToPublic))

// app.get('/weather',(req,res)=>{
// 	const weatherInfo={
// 		forcast:'rainy',
// 		location:'kathmandu'
// 	}
// 	res.send(weatherInfo)
// })

app.listen(3000,()=>{
	console.log('app up and running at port 3000')
})