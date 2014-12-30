'use strict';

var communicator = {};

communicator.send = function(obj, cb) {
    chrome.runtime.sendMessage(obj, cb);
};

communicator.on = function(evt, fn) {
    chrome.runtime.onMessage.addListener(function(obj, _, cb) {
	if (obj.action === evt) fn(obj, cb);
	return true;
    });
};

module.exports = communicator;
