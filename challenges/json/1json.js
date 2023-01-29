//requiring the fs module
const fs=require('fs');

var dataBuffer=fs.readFileSync('data.json'); //reading the file data.json which come in the form of bit and byte and storing it to databuffer
var dataString=dataBuffer.toString();	//to read the data in data.json we have to convert buffer to string

var dataObject=JSON.parse(dataString);	//parsing the dataString into a object

console.log(dataObject.name);	//now we can get value from the object

//updating the data in dataObject 
dataObject.name="hari";
dataObject.age=21;

console.log(dataObject);

var updatedDataString=JSON.stringify(dataObject);	//stringiying the object

fs.writeFileSync('data.json',updatedDataString);	//writing the updated data in the data.json file using fs module