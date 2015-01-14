'use strict';

require('6to5/polyfill');

var buttons = require('./buttons');
var communicator = require('../lib/communicator');
var backgroundQueue = require('./background-queue');

var regs = [
    /\?compose=/, // 0
    /\w+\/\w+/ // 1 // stuff like #inbox/id, or #sent/id, etc.
];

var handlers = [
    require('./handlers/compose'), // 0
    require('./handlers/discussion') // 1
];

window.addEventListener('hashchange', checkFunctions);
checkFunctions();

function checkFunctions() {
    let hash = window.location.hash;
    for (let i = 0; i < regs.length; i++) {
	if (regs[i].test(hash)) return handlers[i](backgroundQueue(communicator), buttons);
    }
}
