//requiring the modules
const path=require('path')
const http=require('http')
const express=require('express')
const socketio=require('socket.io')

const app=express()		//setting the express
const server=http.createServer(app)	//creating a server
const io=socketio(server)	//passing server to socketio

const pathToPublic=path.join(__dirname,'../public')

app.use(express.static(pathToPublic))	//passing the static files

io.on('connection',()=>{
	console.log("new connection established")
})

server.listen(3000,()=>{	//listening to the server
	console.log('app running at port 3000')
})