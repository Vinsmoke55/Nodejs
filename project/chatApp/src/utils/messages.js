const generateMessage=(username,text)=>{	//for returning text message and time at which message is sent
	return {
		username,
		text,
		createdAt:new Date().getTime()
	}
}

const generateLocationMessage=(username,url)=>{
	return {
		username,
		url,
		createdAt:new Date().getTime()
	}
}

module.exports={
	generateMessage,
	generateLocationMessage
}