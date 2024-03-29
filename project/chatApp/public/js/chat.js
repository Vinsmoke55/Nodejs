const socket=io()


//elements
const $messageForm=document.querySelector('#message-form')
const $messageFormInput=$messageForm.querySelector('input')
const $messageFormButton=$messageForm.querySelector('button')
const $sendLocationButton=document.querySelector('#send-location')
const $messages=document.querySelector('#messages')


//template
const messageTemplate=document.querySelector('#message-template').innerHTML
const locationMessageTemplate=document.querySelector('#location-message-template').innerHTML
const sidebarTemplate=document.querySelector('#sidebar-template').innerHTML

//options
const {username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true})	//getting and query string from the browser and parsing to object

const autoScroll=()=>{
	//new message element
	const $newMessage=$messages.lastElementChild

	//height of the new message
	const newMessageStyles=getComputedStyle($newMessage)
	const newMessageMargin=parseInt(newMessageStyles.marginBottom)
	const newMessageHeight=$newMessage.offsetHeight+newMessageMargin

	//visible
	const visibleHeight=$messages.offsetHeight

	//height of message container
	const containerHeight=$messages.scrollHeight

	//how far have i scrolled
	const scrollOffset=$messages.scrollTop+visibleHeight

	if(containerHeight-newMessageHeight<=scrollOffset){
		$messages.scrollTop=$messages.scrollHeight
	}
}

socket.on('message',(message)=>{	//to send the welcome message to the client
	console.log(message)
	const html=Mustache.render(messageTemplate,{	//rendering message to the browser using mustache
		username:message.username,
		message:message.text,
		createdAt:moment(message.createdAt).format('h:mm a')	//putting time before message using moment library
	})
	$messages.insertAdjacentHTML('beforeend',html)
	autoScroll()
})

socket.on('locationMessage',(message)=>{
	console.log(message)
	const html=Mustache.render(locationMessageTemplate,{
		username:message.username,
		url:message.url,
		createdAt:moment(message.createdAt).format('h:mm a')
	})
	$messages.insertAdjacentHTML('beforeend',html)
	autoScroll()
})

socket.on('roomData',({room,users})=>{
	const html=Mustache.render(sidebarTemplate,{
		room,
		users
	})
	document.querySelector('#sidebar').innerHTML=html
})

$messageForm.addEventListener('submit',(e)=>{	//getting the form and adding a event listner
	e.preventDefault()

	$messageFormButton.setAttribute('disabled','disabled')	//disabling the button till message is sent
	//disable

	const message=e.target.elements.message.value	//target form with element name message and taking its value and storing

	socket.emit('sendMessage',message,(error)=>{	//emmiting the message to the server
		$messageFormButton.removeAttribute('disabled')	//enabling button after message is sent
		$messageFormInput.value=''	//setting empty box after message is sent
		$messageFormInput.focus()	//focusing on the input box
		//enable
		if(error){
			return console.log(error)
		}

		console.log('the message was delivered')
	})		
})


$sendLocationButton.addEventListener('click',()=>{	//getting the coordinate withe the button 

	if(!navigator.geolocation){
		return alert('geolocation is not supported by current browser')	//if geolocation is not supported then sending alert
	}

	$sendLocationButton.setAttribute('disabled','disabled')	//disabling the button till location is sent

	navigator.geolocation.getCurrentPosition((position)=>{	//getting the geolocation

		socket.emit('sendLocation',{	//emmiting the lat and long to the server
			latitude:position.coords.latitude,
			longitude:position.coords.longitude
		},()=>{
			console.log('location shared')	//event acknowledgement

			$sendLocationButton.removeAttribute('disabled')		//enaabling the button after the message is sent
		})
	})
})

socket.emit('join',{username,room},(error)=>{		//emmiting the username and room name to the user and callback for the error
	if(error){
		alert(error)
		location.href='/'		//redirecting the root page ie login page
	}
})	