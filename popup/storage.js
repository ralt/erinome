'use strict';

var Promise = require('bluebird');

var storage = {};

storage.get = function(key) {
    return new Promise(function(resolve, reject) {
	chrome.storage.local.get(key, resolve);
    });
};

storage.set = function(items) {
    return new Promise(function(resolve, reject) {
	chrome.storage.local.set(items, resolve);
    });
};

module.exports = storage;
