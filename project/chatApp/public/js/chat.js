const socket=io()

socket.on('message',(welcome)=>{	//to send the welcome message to the client
	console.log(welcome)
})

document.querySelector('#message-form').addEventListener('submit',(e)=>{	//getting the form and adding a event listner
	e.preventDefault()
	const message=e.target.elements.message.value	//target form with element name message and taking its value and storing
	socket.emit('sendMessage',message)		//emmiting the message to the server
})

document.querySelector('#send-location').addEventListener('click',()=>{	//getting the coordinate withe the button 
	if(!navigator.geolocation){
		return alert('geolocation is not supported by current browser')	//if geolocation is not supported then sending alert
	}
	navigator.geolocation.getCurrentPosition((position)=>{	//getting the geolocation
		socket.emit('sendLocation',{	//emmiting the lat and long to the server
			latitude:position.coords.latitude,
			longitude:position.coords.longitude
		})
	})
})