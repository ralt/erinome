'use strict';

var buttons = require('./buttons');

var regs = [
    '\\?compose=new' // 0
].map(x => new RegExp(x));

var handlers = [
    require('./handlers/new') // 0
];

window.addEventListener('hashchange', function() {
    let hash = window.location.hash;
    for (let i = 0; i < regs.length; i++) {
	if (regs[i].test(hash)) return handlers[i](buttons());
    }
});
