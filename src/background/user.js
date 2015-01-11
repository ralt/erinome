'use strict';

module.exports = function(storage, communicator) {
    return {
	setupListeners: function() {
	    return setupListeners(storage, communicator);
	},
	getByName: getByName(storage)
    };
};

function setupListeners(storage, communicator) {
    setupGetUsers(storage, communicator);
    setupGetByName(storage, communicator);
    setupAddUser(storage, communicator);
}

function setupGetUsers(storage, communicator) {
    communicator.on('getUsers', function(_, cb) {
	storage.get('users').get('users').then(cb);
    });
}

function setupGetByName(storage, communicator) {
    communicator.on('getByName', function(obj, cb) {
	return getByName(obj.name).then(cb);
    });
}

function getByName(storage) {
    return function(name) {
	return storage.get('users').get('users').then(function(users) {
	    return users.find(user => user.name === name);
	});
    };
}

function setupAddUser(storage, communicator) {
    communicator.on('addUser', function(obj, cb) {
	storage.get('users').then(function(users) {
	    users.users = users.users || [];
	    users.users.push({
		name: obj.name,
		email: obj.email
	    });
	    return storage.set(users).then(cb);
	}).done();
    });
}
