const sgmail=require('@sendgrid/mail')

const sendGriddApiKey='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'

sgmail.setApiKey(sendGriddApiKey)

sgmail.send({
	to:'neupaneaush3@gmail.com',
	from:'neupaneaush3@gmail.com',
	subject:'the email',
	text:'this is the email'
})