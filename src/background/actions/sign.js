'use strict';

module.exports = function(port) {
    return function(message) {
	port.postMessage({
	    action: 'sign',
	    text: message.text,
	    id: message.id
	});
    };
};
