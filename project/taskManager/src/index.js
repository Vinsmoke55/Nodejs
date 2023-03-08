const express=require('express')
require('./db/mongoose.js')
const userRouter=require('./router/userroute.js')
const taskRouter=require('./router/taskroute.js')

const app=express()

app.use(express.json())		//this line parse the incoming json 
app.use(userRouter)			//using user router
app.use(taskRouter)			//using task router

const port=process.env.PORT||3000

//file uploads using multer
const multer=require('multer')

const upload=multer({
	dest:'images',
	limits:{				//limiting the file size to be less than 1mb
		fileSize:1000000
	},
	fileFilter(req,file,cb){		//filtering a file to be a word document
		if(!file.originalname.match('\.(doc|docx)$')){		//putting a regular expression inside match to be a word document
			return cb(new Error('please upload a word document'))
		}
		cb(undefined,true)
	}
})

app.post('/upload',upload.single('upload'),(req,res)=>{
	res.send()
},(error,req,res,next)=>{				//handiling the express error with callback
	res.status(400).send({error:error.message})
})




app.listen(port,()=>{
	console.log('app running at port '+port)
})


