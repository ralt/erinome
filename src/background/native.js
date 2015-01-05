'use strict';

module.exports = {
    setup: setup
};

function setup(port, nativeActions) {
    port.onDisconnect.addListener(function() {
	alert('There was a problem with the native application connection.');
    });

    port.onMessage.addListener(function(obj) {
	if (obj.action in nativeActions) {
	    nativeActions[obj.action](obj);
	}
    });
};
