'use strict';

var storage = require('../lib/storage');
var communicator = require('../lib/communicator');
var native = require('./native');

var user = require('./user')(storage, communicator);
user.setupListeners();

var discussions = {};

var nativeActions = {
    encrypted: require('./native-actions/encrypted')(communicator),
    decrypted: require('./native-actions/decrypted')(communicator, discussions)
};

var port = chrome.runtime.connectNative('com.margaine.pgp_ext_app');

native.setup(port, nativeActions);

var actions = {
    encrypt: require('./actions/encrypt')(port, discussions),
    decrypt: require('./actions/decrypt')(port, user),
    getMessages: require('./actions/getMessages')(discussions)
};

Object.keys(actions).forEach(function(action) {
    communicator.on(action, actions[action]);
});
