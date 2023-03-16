//requiring the modules
const path=require('path')
const http=require('http')
const express=require('express')
const socketio=require('socket.io')
const Filter=require('bad-words')

const app=express()		//setting the express
const server=http.createServer(app)	//creating a server
const io=socketio(server)	//passing server to socketio

const pathToPublic=path.join(__dirname,'../public')

app.use(express.static(pathToPublic))	//passing the static files


io.on('connection',(socket)=>{
	console.log("new connection established")

	socket.broadcast.emit('message',"A new user have joined")	//line line displays message in every connection except itself

	socket.emit('message',"welcome!")	//emmiting the welcome! to the client
	
	socket.on('sendMessage',(message,callback)=>{	//taking emitted message form the client 
		const filter=new Filter
		if(filter.isProfane(message)){		//this line donot allow any profane message
			return callback('profanity not allowed')
		}
		io.emit('message',message)			//emmiting message to client
		callback()				//event acknowledgement
	})

	socket.on('sendLocation',(coords,callback)=>{		//to send the coordinate 
		io.emit('locationMessage',`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
		callback()		//event acknowledgement
	})

	socket.on('disconnect',()=>{
		io.emit('message',"A user have left")	//this line displays the message when use user leaves the connection
	})
})

server.listen(3000,()=>{	//listening to the server
	console.log('app running at port 3000')
})