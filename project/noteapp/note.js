const fs=require('fs');
const chalk=require('chalk');

//adds the note to the note.json file
var addNote=(title,body)=>{
	var note=loadnote();		
	note.push({
		title:title,
		body:body
	});
	saveNote(note);
	console.log(chalk.green.inverse('note added'));
}

//removing the note from the json file
var removeNote=(title)=>{
	try{
		var note=loadnote();
	var noteToSave=note.filter((note)=>{
		return note.title!==title;			//return and save to noteToSave if note.title is not equal to title
	});
	saveNote(noteToSave);
	console.log(chalk.bgGreen.black('note removed'));

	}
	catch(e){
		console.log(chalk.bgRed.black('note not removed'));
	}


}

//listing the title of all the notes saved
var listNote=()=>{
	var note=loadnote();
	console.log(chalk.yellow.inverse("your notes ..."));
	note.forEach((note)=>{
		console.log(note.title);
	})

}

//reading the note with title
var readNote=(title)=>{
	try{
		var note=loadnote();
	var findNote=note.find((note)=>{
		return note.title===title;
	})
		console.log(chalk.yellow.inverse("the content of the note is ...."));
		console.log(findNote.body);
	}
	catch(e){
		console.log(chalk.red.inverse("note not found"));
	}
}

//loading a note and if there is no such file than store returning an array
var loadnote=()=>{
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
var saveNote=(note)=>{
	var dataJson=JSON.stringify(note);
	fs.writeFileSync('note.json',dataJson);
}

//exporting the module addNote
module.exports={
	addNote:addNote,
	removeNote:removeNote,
	listNote:listNote,
	readNote:readNote
}








