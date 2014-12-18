var port;

function connect() {
    port = chrome.runtime.connectNative('com.margaine.pgp_ext_app');
    port.onMessage.addListener(function(msg) {
	console.log("Received", msg);
    });
    port.onDisconnect.addListener(function() {
	console.log("Disconnected");
    });
    port.postMessage({ text: "foobar" });
    port.postMessage({ text: "barfoo" });
}
