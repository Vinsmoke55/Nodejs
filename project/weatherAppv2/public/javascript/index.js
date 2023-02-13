console.log('client side javascript is enabled')

fetch('https://puzzle.mead.io/puzzle').then((response)=>
		response.json().then((data)=>{
			console.log(data)
		})
	)



const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message=document.querySelector('#mess')
const locate=document.querySelector('#location')

message.textContent=''

weatherForm.addEventListener('submit',(e)=>{
	e.preventDefault()
	const location=search.value
	
	fetch('http://localhost:3000/weather?address='+location).then((response)=>
		response.json().then((data)=>{
				locate.textContent=location
				message.textContent=data.forcast
			
		})
	)
})