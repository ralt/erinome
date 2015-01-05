'use strict';

module.exports = function(port, user) {
    return function(message) {
	user.getByName(message.name).then(function(user) {
	    port.postMessage({
		action: 'decrypt',
		name: message.name,
		email: user.email,
		message: message.message
	    });
	});
    };
};
