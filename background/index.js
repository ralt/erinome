'use strict';

var storage = require('../lib/storage');
var communicator = require('../lib/communicator');
var user = require('./user')(storage, communicator);

user.setupListeners();

var discussions = {};

var port = chrome.runtime.connectNative('com.margaine.pgp_ext_app');

port.onMessage.addListener(function(obj) {
    var getTabOpt = {active: true, currentWindow: true};
    if (obj.action === 'encrypted') {
	chrome.tabs.query(getTabOpt, function(tabs) {
	    chrome.tabs.sendMessage(tabs[0].id, {
		type: 'encrypted',
		message: obj.text,
		name: obj.name
	    });
	});
    }
    if (obj.action === 'decrypted') {
	addMessage(discussions, obj);
    }
});

function addMessage(discussions, message) {
    if (!discussions[message.sender]) {
	discussions[message.sender] = [];
    }
    communicator.send({
    	action: 'decrypted',
	message: message.text,
	sender: message.sender
    });
    discussions[message.sender].push({
	type: 'sender',
	message: message.text,
	sender: message.sender
    });
}

port.onDisconnect.addListener(function() {
    alert('There was a problem with the native application connection.');
});

communicator.on('encrypt', function(message) {
    encrypt(message, discussions);
});

communicator.on('decrypt', function(message) {
    decrypt(message, discussions);
});

communicator.on('getMessages', function(message, cb) {
    cb(discussions[message.user.name].map(function(obj) {
	return obj.message;
    }));
});

function encrypt(message, discussions) {
    if (!discussions[message.email]) {
	discussions[message.email] = [];
    }
    discussions[message.email].push({
	type: 'me',
	message: message.message
    });
    port.postMessage(message);
}

function decrypt(message, discussions) {
    user.getByName(message.name).then(function(user) {
	port.postMessage({
	    action: 'decrypt',
	    name: message.name,
	    email: user.email,
	    message: message.message
	});
    });
}
