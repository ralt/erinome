'use strict';

var discussions = {};

var port;
port = chrome.runtime.connectNative('com.margaine.pgp_ext_app');
port.onDisconnect.addListener(function() {
    alert('There was a problem with the native application connection.');
});

port.onMessage.addListener(function(obj) {
    if (obj.action === 'encrypted') {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    chrome.tabs.sendMessage(tabs[0].id, {type: 'encrypted', message: obj.text, name: 'Florian'});
	});
    }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'encrypt') {
	return encrypt(port, message, discussions);
    }
});

function encrypt(port, message, discussions) {
    if (!discussions[message.email]) {
	discussions[message.email] = [];
    }
    discussions[message.email].push({type: 'me', message: message.message});
    port.postMessage(message);
}
