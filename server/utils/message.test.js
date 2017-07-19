var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');


describe('generateMessage', ()=>{
	it('should generate correct message object', ()=>{
		//store res in variable
		//assert from match
		//assert text matches up
		//assert that createdAt is a number
		var from = 'Dee';
		var text = 'Some message';

		var message = generateMessage(from,text);
		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from,text})
	});

	describe('generateLocationMessage', ()=>{
		it('should generate correct location object', ()=>{
			var from = 'Dee';
			var latitude = 15;
			var longitude = 19;
			var url = 'https://www.google.com/maps?q=15,19';
			var message = generateLocationMessage(from,latitude,longitude);

			expect(message.createdAt).toBeA('number');
			expect(message).toInclude({from,url});
		})
	})
});