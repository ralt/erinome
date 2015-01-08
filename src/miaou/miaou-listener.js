'use strict';

var communicator;
var name;

module.exports = function(injectedCommunicator, injectedName) {
    communicator = injectedCommunicator;
    name = injectedName;
    return {
	listen: listen
    };
};

function listen(messages) {
    var observer = new MutationObserver(function(mutations) {
	var addedNodes;
	for (var i = 0; i < mutations.length; i++) {
	    addedNodes = mutations[i].addedNodes;
	    if (!addedNodes || !addedNodes.length) continue;
	    handleAddedNodes(mutations[i].addedNodes);
	}
    });

    observer.observe(messages, {childList: true});
}

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

function handleText(child) {
    // innerText keeps the \n while textContent doesn't
    var text = child.innerText;
    var sender = child.previousElementSibling.textContent.trim();

    var message = text.match(new RegExp('#pgp@(\\w+)\\n([\\s\\S]*)'));
    if (!message) return;

    if (sender === name) {
	communicator.send({
	    action: 'addDiscussion',
	    name: sender,
	    sender: message[1],
	    type: 'encrypted'
	});
    }

    if (message[1] === name) {
	communicator.send({
	    action: 'decrypt',
	    message: message[2],
	    name: sender,
	    sender: name
	});
    }
}
