(function() {
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	console.log(message, sender);
    });
}());
