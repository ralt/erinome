(function() {
    var messages = document.querySelector('#messages');
    if (!messages) return;

    var name = 'Florian'; // @todo

    var observer = new MutationObserver(function(mutations) {
	var addedNodes;
	for (var i = 0; i < mutations.length; i++) {
	    addedNodes = mutations[i].addedNodes;
	    if (!addedNodes || !addedNodes.length) continue;
	    handleAddedNodes(mutations[i].addedNodes);
	}
    });

    observer.observe(messages, {childList: true});

    function handleAddedNodes(nodes) {
	var node;
	for (var i = 0; i < nodes.length; i++) {
	    node = nodes[i];
	    if (!/\bmessage\b/.test(node.className)) continue;

	    handleChildren(node.childNodes);
	}
    }

    function handleChildren(children) {
	var child;
	for (var i = 0; i < children.length; i++) {
	    child = children[i];
	    if (!/\bcontent\b/.test(child.className)) continue;
	    handleText(child);
	}
    }

    // Scenario "Miaou user sends me an encrypted message"
    function handleText(child) {
	// innerText keeps the \n while textContent doesn't
	var text = child.innerText;
	message = text.match(new RegExp('#pgp@' + name + '\n(.*)'));
	if (!message) return;
	
	chrome.runtime.sendMessage({action: 'decrypt', message: message[1]});
    }

    // Scenario "I want to send an encrypted message"
    chrome.runtime.onMessage.addListener(function(request) {
	if (request.type !== 'encrypted') return;
	
	var pendingMessages = document.querySelector('#pending-messages');
	
	var div = document.createElement('div');
	div.textContent = '#pgp' + '@' + request.name + '\n' +
	    request.message.join('\n');
	
	pendingMessages.appendChild(div);
    });

}());
