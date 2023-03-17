const generateMessage=(text)=>{	//for returning text message and time at which message is sent
	return {
		text,
		createdAt:new Date().getTime()
	}
}

module.exports={
	generateMessage
}