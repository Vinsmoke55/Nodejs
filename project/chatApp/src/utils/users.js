const users=[]

//addUser,removeUser,getUser,getUserInRoom

const addUser=({username,room,id})=>{
	//clean the data
	username=username.trim().toLowerCase()
	room=room.trim().toLowerCase()

	//validating the data
	if(!username||!room){
		return {
			error:'username and room should be provided'
		}
	}

	//check for existing user
	const existingUser=users.find((user)=>{
		return user.room===room&&user.username===username
	})

	//validating username
	if(existingUser){
		return {
			error:'username in use!'
		}
	}

	const user={id,username,room}
	users.push(user)
	return {user}
}

const removeUser=(id)=>{
	const index=users.findIndex((user)=>{		//finding the user by its index
		return user.id===id
	})

	if (index!==-1){
		return users.splice(index,1)[0]		//removing the user by its index
	}
}

addUser({
	id:22,
	username:'ayush',
	room:'ank'
})

console.log(users)

const removedUser=removeUser(22)

console.log(removedUser)
console.log(users)