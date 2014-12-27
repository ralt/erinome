'use strict';

var discussions = {};

var port = chrome.runtime.connectNative('com.margaine.pgp_ext_app');

port.onMessage.addListener(function(obj) {
    var getTabOpt = {active: true, currentWinow: true};
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
    chrome.runtime.sendMessage({
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

chrome.runtime.onMessage.addListener(function(message, _, sendResponse) {
    if (message.action === 'encrypt') {
	encrypt(message, discussions);
	return;
    }
    if (message.action === 'decrypt') {
	decrypt(message, discussions);
	return;
    }
    if (message.action === 'getMessages') {
	sendResponse(discussions[message.user.email].map(function(obj) {
	    return obj.message;
	}));
	return;
    }
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

function decrypt(port, message, discussions) {
    chrome.runtime.sendMessage({
	action: 'getEmail',
	name: message.name
    }, function(response) {
	port.postMessage({
	    action: 'decrypt',
	    name: message.name,
	    email: response.email,
	    message: message.message
	});
    });
}
