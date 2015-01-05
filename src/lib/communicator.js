'use strict';

var communicator = {};

var events = {};

communicator.send = function(obj, cb) {
    chrome.runtime.sendMessage(obj, cb);
};

communicator.sendTab = function(obj) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	chrome.tabs.sendMessage(tabs[0].id, obj);
    });
};

communicator.on = function(evt, fn) {
    events[evt] = events[evt] || [];
    events[evt].push(fn);
};

chrome.runtime.onMessage.addListener(function(obj, _, cb) {
    if (obj.action in events) {
	events[obj.action].forEach(function(fn) {
	    fn(obj, cb);
	});
    }
    return true;
});

module.exports = communicator;
