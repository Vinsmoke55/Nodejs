const express=require('express')
const app=express()

app.get('/product',(req,res)=>{
	if(!req.query.search){
		return res.send({
			error:'need to provide the search query'
		})
	}
	console.log(req.query.search)
})

app.listen(3000,()=>{
	console.log('app up and running at port 3000')
})