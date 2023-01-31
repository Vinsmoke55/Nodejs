const fs=require('fs');


var addNote=function(title,body){
	var note=loadnote();		
	note.push({
		title:title,
		body:body
	});
	saveNote(note);
}


//loading a note and if there is no such file than store returning an array
var loadnote=function(){
	try{
		var dataBuffer=fs.readFileSync('note.json');
		var dataString=dataBuffer.toString();
		return JSON.parse(dataString);
	}catch(e){
		return []
	}

}

//saving the files in the note.json file 
//first of all always array will be returned
//or else we cannot use push() method
var saveNote=function(note){
	var dataJson=JSON.stringify(note);
	fs.writeFileSync('note.json',dataJson);
}

//exporting the module addNote
module.exports={
	addNote:addNote
}








