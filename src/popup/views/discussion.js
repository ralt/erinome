'use strict';

var byId = function(id) { return document.getElementById(id); };

var messageTemplate = byId('import-message').import.querySelector('template');
var discussionTemplate = byId('import-discussion').import.querySelector('template');

module.exports = function(viewsManager, communicator) {
    var name = 'discussion';
    var element = byId('discussion');
    var user;

    return {
	getName() {
	    return name;
	},
	getElement() {
	    return element;
	},
	setUser(u) {
	    user = u;
	},
	run() {
	    setup(user, communicator, viewsManager);
	}
    };
};

function setup(user, communicator, viewsManager) {
    var clone = document.importNode(discussionTemplate.content, true);

    // Empty out the discussion
    var discussion = byId('discussion');
    while (discussion.firstChild) discussion.firstChild.remove();

    setupBackButton(clone, viewsManager);
    setupDiscussionElements(clone, user, communicator);

    // Can't really pass the clone there.
    // The documentfragment will be empty once it's inserted
    // into the DOM, so I'll have to re-query #messages, no
    // matter what.
    getDiscussions(user, communicator);

    discussion.appendChild(clone);
}

function setupBackButton(clone, viewsManager) {
    var backElement = clone.querySelector('#back');

    backElement.addEventListener('click', function() {
	viewsManager.setView('discussions-list');
    });
}

function setupDiscussionElements(clone, user, communicator) {
    var nameElement = clone.querySelector('#name');
    var inputElement = clone.querySelector('#input');
    var submitElement = clone.querySelector('#send');

    nameElement.textContent = user.name;

    submitElement.addEventListener('click', function() {
	communicator.send({
	    action: 'encrypt',
	    email: user.email,
	    message: inputElement.value,
	    name: user.name
	});

	inputElement.value = '';
    });
}

function getDiscussions(user, communicator) {
    communicator.on('decrypted', function(request) {
	if (request.sender === user.name) {
	    addMessage(request);
	}
    });

    communicator.send({
	action: 'getMessages',
	user: user
    }, function(messages) {
	messages.forEach(function(message) {
	    addMessage(message);
	});
    });
}

function addMessage(message) {
    var msgClone = document.importNode(messageTemplate.content, true);

    var msg = msgClone.querySelector('.message');
    msg.textContent = message.message;

    switch (message.type) {
    case 'me':
	msg.className += ' me';
	break;
    case 'sender':
	msg.className += ' sender';
	break;
    case 'me:encrypted':
	msg.className += ' me-encrypted';
	break;
    }

    byId('messages').appendChild(msgClone);
}
