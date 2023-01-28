//requiring yargs library
const yargs=require('yargs');

//creating add command
yargs.command({
	command:'add',
	describe:'add to the note',
	builder:{
		title:{
			describe:'note title',
			demandOption:true,
			type:'string'
		},
		body:{
			describe:"note body",
			demandOption:true,
			type:'string'
		}
	},
	handler:function(argv){
		console.log('title:'+argv.title);
		console.log('body:'+argv.body);
	}
});

// // creating remove command
// yargs.command({
// 	command:'remove',
// 	description:'remove from the note',
// 	handler:function(){
// 		console.log('removing form the note');
// 	}
// });

// //creting a list command
// yargs.command({
// 	command:'list',
// 	description:'list the note',
// 	handler:function(){
// 		console.log('adding the note');
// 	}
// });

// //creating a read command
// yargs.command({
// 	command:'read',
// 	description:'read the note',
// 	handler:function(){
// 		console.log('adding the note');
// 	}
// });


//instead of cosole.log we can use yargs.parse()
// console.log(yargs.argv);
yargs.parse();
