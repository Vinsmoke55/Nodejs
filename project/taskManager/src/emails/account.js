const sgmail=require('@sendgrid/mail')

const sendGriddApiKey='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'	//aoi key

sgmail.setApiKey(sendGriddApiKey)		//setting the api key

const sendWelcomeEmail=(email,name)=>{		//to send the welcome email to the user
	sgmail.send({
	to:email,
	from:'neupaneaush3@gmail.com',
	subject:'greeting the user',
	text:`welcome ${name},giver your review about the application`
})
}

module.exports={
	sendWelcomeEmail
}