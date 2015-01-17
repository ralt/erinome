'use strict';

var Promise = require('bluebird');

module.exports = function(communicator) {
    let callbacks = {};
    let id = 0;

    communicator.on('gmailqueue', function(obj) {
	callbacks[obj.id](obj);
	delete callbacks[obj.id];
    });

    return {
	send(msg, cb) {
	    return new Promise(function(resolve, reject) {
		msg.id = ++id;
		callbacks[id] = resolve;
		communicator.send(msg);
	    });
	}
    };
};
