//this is the fetch api which donot work with the node 
//but works with the browser
fetch('http://puzzle.mead.io/puzzle').then((response)=>
		response.json().then((data)=>{
			console.log(data)
		})
	)