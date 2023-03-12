const socket=io()

socket.on('message',(welcome)=>{	//to send the welcome message to the client
	console.log(welcome)
})

document.querySelector('#message-form').addEventListener('submit',(e)=>{	//getting the form and adding a event listner
	e.preventDefault()
	const message=e.target.elements.message.value	//target form with element name message and taking its value and storing
	socket.emit('sendMessage',message)		//emmiting the message to the server
})