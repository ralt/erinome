'use strict';

module.exports = function(discussions) {
    return function(message, cb) {
	cb(discussions[message.user.name].map(function(obj) {
	    return obj.message;
	}));
    };
};
