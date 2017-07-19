const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// const publicPath = path.join(__dirname, '../public');

io.on('connection', (socket) =>{
	console.log('connected');

	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to chat, b'
	});
	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New user joined',
		createdAt: new Date().getTime()
	})

	socket.on('disconnect', ()=>{
		console.log('disconnected from browser! D: ')
	});
	socket.on('createMessage', (message)=>{
		console.log('createMessage',message);
		io.emit('newMessage', {
			from:message.from,
			text: message.text,
			createdAt: new Date().getTime()
		})
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// })
	})
})

app.use(express.static(publicPath));

server.listen(port, ()=>{
	console.log(`Server is up on port: ${port}`);
})