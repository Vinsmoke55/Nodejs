const yargs=require('yargs');
const fs=require('fs');
const notes=require('./note.js');

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
yargs.parse();
