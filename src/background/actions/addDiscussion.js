'use strict';

module.exports = function(discussions) {
    return function(message) {
	if (!discussions[message.sender]) {
	    discussions[message.sender] = [];
	}

	discussions[message.sender].push({
	    type: 'me:encrypted',
	    message: '',
	    sender: message.sender
	});
    };
};
