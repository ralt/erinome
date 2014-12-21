'use strict';

var Promise = require('bluebird');

var communicator = {};

communicator.send = function(obj) {
    return chrome.runtime.sendMessage(obj);
};

module.exports = communicator;
