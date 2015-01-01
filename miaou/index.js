'use strict';

var communicator = require('../lib/communicator');

var messages = document.querySelector('#messages');
if (messages) {
    var me = JSON.parse(document.querySelector('#locals').innerHTML).me;
    var name = me.name;

    var miaouListener = require('./miaou-listener')(communicator, name);
    miaouListener.listen(messages);

    var pgpExtListener = require('./pgp-ext-listener');
    pgpExtListener.listen(communicator);
}
