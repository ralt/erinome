'use strict';

var Promise = require('bluebird');

var storage = {};

storage.get = function(key) {
    return new Promise(function(resolve, reject) {
	chrome.storage.local.get(key, function(items) {
	    if (items) resolve(items);
	    else reject(new Error(chrome.runtime.lastError));
	});
    });
};

storage.set = function(items) {
    return new Promise(function(resolve, reject) {
	chrome.storage.local.set(items, resolve);
    });
};

module.exports = storage;
