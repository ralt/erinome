'use strict';

var Promise = require('bluebird');

var communicator = {};

communicator.send = function(obj) {
    return new Promise(function(resolve, reject) {
	chrome.runtime.sendMessage(obj, resolve);
    });
};

module.exports = communicator;
