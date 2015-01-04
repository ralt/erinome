'use strict';

module.exports = function(viewsManager, communicator) {
    var name = 'discussion';
    var element = document.querySelector('#discussion');
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
	    setup(user, communicator);
	    setupBackButton(viewsManager);
	}
    };
};

function setupBackButton(viewsManager) {
    var backElement = document.querySelector('#back');

    backElement.onclick = function() {
	viewsManager.setView('discussions-list');
    };
}

// @todo use an HTML template instead of reusing the same DOM element
function setup(user, communicator) {
    var byId = function(id) { return document.getElementById(id); };
    var nameElement = byId('name');
    var inputElement = byId('input');
    var submitElement = byId('send');

    nameElement.textContent = user.name;

    // Voluntarily using .onclick instead of addEventListener; I want only one.
    submitElement.onclick = function() {
	communicator.send({
	    action: 'encrypt',
	    email: user.email,
	    message: inputElement.value,
	    name: user.name
	});

	inputElement.value = '';
    };

    getDiscussions(user, communicator);
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
    document.getElementById('messages').innerHTML += '<div class="message">' + message + '</div>';
}
