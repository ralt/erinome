'use strict';

module.exports = function(storage, communicator) {
    return {
	setupListeners: function() {
	    return setupListeners(storage, communicator);
	}
    };
};

function setupListeners(storage, communicator) {
    setupGetUsers(storage, communicator);
    setupGetByName(storage, communicator);
    setupAddUser(storage, communicator);
}

function setupGetUsers(storage, communicator) {
    communicator.on('getUsers', function(_, cb) {
	cb(storage.get('users').get('users'));
    });
}

function setupGetByName(storage, communicator) {
    communicator.on('getByName', function(obj, cb) {
	storage.get('users').get('users').then(function(users) {
	    for (var i = 0; i < users.length; i++) {
		if (users[i].name === obj.name) return cb(users[i].name);
	    }
	    return cb();
	}).done();
    });
}

function setupAddUser(storage, communicator) {
    communicator.on('addUser', function(obj, cb) {
	storage.get('users').then(function(users) {
	    users.users = users.users || {};
	    users.users[obj.email] = {
		name: obj.name,
		email: obj.email
	    };
	    return storage.set(users).then(cb);
	}).done();
    });
}
