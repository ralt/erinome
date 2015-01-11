'use strict';

var Promise = require('bluebird');

module.exports = function(storage, communicator) {
    return {
	setupListeners() {
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
    communicator.on('getByName', function*(obj, cb) {
	cb(yield getByName(storage)(obj.name));
    });
}

function getByName(storage) {
    return Promise.coroutine(function*(name) {
	let users = yield storage.get('users').get('users');
	return users.find(u => u.name === name);
    });
}

function setupAddUser(storage, communicator) {
    communicator.on('addUser', function*(obj, cb) {
	let users = yield storage.get('users');
	users.users = users.users || [];
	users.users.push({
	    name: obj.name,
	    email: obj.email
	});
	return storage.set(users).then(cb);
    });
}
