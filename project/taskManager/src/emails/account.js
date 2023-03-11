const sgmail=require('@sendgrid/mail')

sgmail.setApiKey(process.env.SEND_GRID_API_KEY)		//setting the api key

const sendWelcomeEmail=(email,name)=>{		//to send the welcome email to the user
	sgmail.send({
	to:email,
	from:'neupaneaush3@gmail.com',
	subject:'greeting the user',
	text:`welcome ${name},giver your review about the application`
})
}

const sendCancelEmail=(email,name)=>{		//to send the cancelation email to the user
	sgmail.send({
	to:email,
	from:'neupaneaush3@gmail.com',
	subject:'canclelation email',
	text:`hello ${name},your account have been sucessfully removed`
})
}


module.exports={
	sendWelcomeEmail,
	sendCancelEmail
}