	var socket = io();
	socket.on('connect', function (){
		console.log('connected to server');
		
	});

	socket.on('disconnect', function(){
		console.log('disconnected from server')
	});

	socket.on('newMessage', function(message){
		var formattedTime = moment(message.createdAt).format('h:mm a');
		var li = jQuery('<li></li>');
		li.text(`${message.from}: ${formattedTime} ${message.text}`);
		jQuery('#messages').append(li);
	});

	socket.on('newLocationMessage', function(message){
		var formattedTime = moment(message.createdAt).format('h:mm a');
		var li = jQuery('<li></li>');
		var a = jQuery('<a target="_blank">My current location</a>');
		li.text(`${message.from} ${formattedTime} : `);
		a.attr('href', message.url);

		li.append(a);
		jQuery('#messages').append(li);
	})

	jQuery('#message-form').on('submit', function(e){
		var messageTextBox = jQuery('[name=message]');
		e.preventDefault();
		socket.emit('createMessage', {
			from:'User',
			text: messageTextBox.val()
		}, function (){
			messageTextBox.val('');
		});
	});

	var locationButton = jQuery('#send-location');

	locationButton.on('click', function(){
		console.log('happened click');
		if(!navigator.geolocation){
			return alert('Geolocation not supported by your browser')
		}
		locationButton.attr('disabled', 'disabled').text('Sending location...');
		navigator.geolocation.getCurrentPosition(function(position){
			locationButton.removeAttr('disabled').text('Send location');
			socket.emit('createLocationMessage', {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});
		},function(){
			alert('unable to fetch location.');
		})
	})
	// jQuery('#message-list').createElement('li');



	//listener for email
	// socket.on('newEmail', function(email){
	// 	console.log('new email', email);
	// })