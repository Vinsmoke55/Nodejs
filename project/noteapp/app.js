const yargs=require('yargs');
const fs=require('fs');
const notes=require('./note.js');

//creatin add command with title and body
yargs.command({
	command:'add',
	describe:"to add note",
	builder:{
		title:{
			describe:'add title',
			demandOption:true,
			type:'string'
		},
		body:{
			describe:'add body',
			demandOption:true,
			type:'string'
		}
	},
	handler:(argv)=>{
		notes.addNote(argv.title,argv.body);
		
	}
});

//creating remove command with title
yargs.command({
	command:'remove',
	describe:"remove a note",
	builder:{
		title:{
			describe:'note title',
			demandOption:true,
			type:'string'
		}
	},
	handler:(argv)=>{
		notes.removeNote(argv.title);
	}
})

//creating a list command
yargs.command({
	command:'listnote',
	describe:'list the notes',
	handler(){
		notes.listNote();
	}
})
yargs.parse();
