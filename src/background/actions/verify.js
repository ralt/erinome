'use strict';

module.exports = function(port) {
    return function(message) {
	port.postMessage({
	    action: 'verify',
	    text: message.text,
	    id: message.id
	});
    };
};
