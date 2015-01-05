'use strict';

var byId = function(id) { return document.getElementById(id); };

module.exports = function(viewsManager, communicator) {
    var name = 'discussion';
    var element = byId('discussion');
    var user;

    return {
	getName: function() {
	    return name;
	},
	getElement: function() {
	    return element;
	},
	setUser: function(u) {
	    user = u;
	},
	run: function() {
	    setup(user, communicator, viewsManager);
	}
    };
};

function setupBackButton(viewsManager) {
    var backElement = byId('back');

    backElement.addEventListener('click', function() {
	viewsManager.setView('discussions-list');
    });
}

// @todo use an HTML template instead of reusing the same DOM element
function setup(user, communicator, viewsManager) {
    // Get a clone of the template
    var template = byId('import-discussion').import.querySelector('template');
    var clone = document.importNode(template.content, true);

    // Empty out the discussion
    var discussion = byId('discussion');
    while (discussion.firstChild) discussion.firstChild.remove();

    // Add the clone
    discussion.appendChild(clone);

    // Back button
    setupBackButton(viewsManager);

    // Discussion elements
    setupDiscussionElements(user, communicator);

    getDiscussions(user, communicator);
}

function setupDiscussionElements(user, communicator) {
    var nameElement = byId('name');
    var inputElement = byId('input');
    var submitElement = byId('send');

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
	    addMessage(request.message);
	}
    });

    communicator.send({
	action: 'getMessages',
	user: user
    }, function(messages) {
	messages.forEach(addMessage);
    });
}

function addMessage(message) {
    // @todo use the "me" class when the message is sent by me.
    var messageTemplate = byId('import-message').import.querySelector('template');
    var clone = document.importNode(messageTemplate.content, true);

    clone.querySelector('.message').textContent = message;

    byId('messages').appendChild(clone);
}
