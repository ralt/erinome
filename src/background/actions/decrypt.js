'use strict';

module.exports = function(port, user) {
    return function*(message) {
	let u = user.getByName(message.name);
	port.postMessage({
	    action: 'decrypt',
	    name: message.name,
	    email: u.email,
	    message: message.message
	});
    };
};
