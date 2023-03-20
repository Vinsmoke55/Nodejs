//requiring the modules
const path=require('path')
const http=require('http')
const express=require('express')
const socketio=require('socket.io')
const Filter=require('bad-words')
const {generateMessage,generateLocationMessage}=require('./utils/messages.js')
const {addUser,removeUser,getUser,getUserInRoom}=require('./utils/users.js')

const app=express()		//setting the express
const server=http.createServer(app)	//creating a server
const io=socketio(server)	//passing server to socketio

const pathToPublic=path.join(__dirname,'../public')

app.use(express.static(pathToPublic))	//passing the static files


io.on('connection',(socket)=>{
	console.log("new connection established")

	socket.on('join',(options,callback)=>{
		const {error,user}=addUser({id:socket.id,...options})

		if(error){
			return callback(error)
		}

		socket.join(user.room)		//joining the room 
		socket.emit('message',generateMessage('welcome!'))	//emmiting the welcome! to the client
		socket.broadcast.to(user.room).emit('message',generateMessage(`${user.username} has joined!`))	//this line to other person in the room except itself
		callback()
	})
	
	socket.on('sendMessage',(message,callback)=>{	//taking emitted message form the client 
		const filter=new Filter
		if(filter.isProfane(message)){		//this line donot allow any profane message
			return callback('profanity not allowed')
		}
		io.emit('message',generateMessage(message))			//emmiting message to client
		callback()				//event acknowledgement
	})

	socket.on('sendLocation',(coords,callback)=>{		//to send the coordinate 
		io.emit('locationMessage',generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
		callback()		//event acknowledgement
	})

	socket.on('disconnect',()=>{
		const user=removeUser(socket.id)
		if(user){
			io.to(user.room).emit('message',generateMessage(`${user.username} have left the room`))	//this line displays the message when use user leaves the connection
		}
	})
})

server.listen(3000,()=>{	//listening to the server
	console.log('app running at port 3000')
})