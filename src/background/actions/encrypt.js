'use strict';

module.exports = function(port, discussions) {
    return function(message) {
	if (!discussions[message.email]) {
	    discussions[message.email] = [];
	}
	discussions[message.email].push({
	    type: 'me',
	    message: message.message
	});
	port.postMessage(message);
    };
};
