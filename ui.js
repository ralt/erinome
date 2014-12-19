function initializeNativeMessaging(ee) {
    var port = chrome.runtime.connectNative('com.margaine.pgp_ext_app');
    ee.on('send', function(obj) {
	port.postMessage(obj);
    });
    port.onMessage.addListener(function(msg) {
	ee.emit('received', msg);
    });
    port.onDisconnect.addListener(function() {
	alert('There was a problem with the native application connection.');
    });
}

function setUpListeners(ee) {
    setUpSubmitListener(ee);
    setUpReceivedListener(ee);
}

function setUpSubmitListener(ee) {
    document.querySelector('#send').addEventListener('submit', function(e) {
	e.preventDefault();

	ee.emit('send', {
	    action: 'encrypt',
	    email: 'florian.margaine@commerceguys.com',
	    message: this.elements.input.value
	});
    });
}

function setUpReceivedListener(ee) {
    ee.on('received', function(obj) {
	console.log(obj);
    });
}

var ee = EventEmitter();

initializeNativeMessaging(ee);
setUpListeners(ee);
