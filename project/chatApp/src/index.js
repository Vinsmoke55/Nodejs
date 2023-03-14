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


io.on('connection',(socket)=>{
	console.log("new connection established")

	socket.broadcast.emit('message',"A new user have joined")	//line line displays message in every connection except itself

	socket.emit('message',"welcome!")	//emmiting the welcome! to the client
	
	socket.on('sendMessage',(message)=>{	//taking emitted message form the client 
		io.emit('message',message)			//emmiting message to client
	})

	socket.on('sendLocation',(coords)=>{		//to send the coordinate to all the connection
		io.emit('message',`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
	})

	socket.on('disconnect',()=>{
		io.emit('message',"A user have left")	//this line displays the message when use user leaves the connection
	})
})

server.listen(3000,()=>{	//listening to the server
	console.log('app running at port 3000')
})