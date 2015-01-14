'use strict';

module.exports = function(port) {
    return function(message) {
	port.postMessage({
	    action: 'signencrypt',
	    text: message.text,
	    recipient: message.recipient,
	    id: message.id
	});
    };
};
