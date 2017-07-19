	var socket = io();
	socket.on('connect', function (){
		console.log('connected to server');
		
	})

	socket.on('disconnect', function(){
		console.log('disconnected from server')
	});

	socket.on('newMessage', function(message){
		console.log('newMessage: ', message);
	})

	//listener for email
	// socket.on('newEmail', function(email){
	// 	console.log('new email', email);
	// })