var expect = require('expect');
var {generateMessage} = require('./message');


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
});