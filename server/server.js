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
	console.log('connection or something');

	socket.on('disconnect', ()=>{
		console.log('disconnected from browser! D: ')
	});

	socket.emit('newMessage', {
		from:'Carl',
		text: 'Who knew unicorns could type?',
		createdAt: 123213215
	})
	socket.on('createMessage', (message)=>{
		console.log('createMessage',message);
	})
})

app.use(express.static(publicPath));

server.listen(port, ()=>{
	console.log(`Server is up on port: ${port}`);
})