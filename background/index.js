chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
});


var port;
    
function initializeNativeMessaging() {
    port = chrome.runtime.connectNative('com.margaine.pgp_ext_app');
    port.onDisconnect.addListener(function() {
	alert('There was a problem with the native application connection.');
    });
}

function setUpListeners() {
    setUpReceivedListener();
}

function setUpReceivedListener() {
    port.onMessage.addListener(function(obj) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    chrome.tabs.sendMessage(tabs[0].id, {type: 'encrypted', message: obj.text, name: 'Florian'});
	});
    });
}

initializeNativeMessaging();
setUpListeners();
