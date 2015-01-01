'use strict';

var communicator;

module.exports = {
    listen: listen
};

var inputTextarea = document.querySelector('#input');
var sendButton = document.querySelector('#send');

function listen(communicator) {
    communicator.on('encrypted', function(request) {
    	var message = ['#pgp' + '@' + request.name].concat(request.message);

	inputTextarea.value = message.map(addSpaces).join('\n');
	sendButton.click();
    });
}

function addSpaces(line) {
    return '    ' + line;
}
