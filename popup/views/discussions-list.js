'use strict';

var makeCollapsible = require('../ui/collapsible.js');

module.exports = function(viewManager, communicator) {
    var name = 'discussions-list';
    var element = document.querySelector('#discussions-list');
    var discussionsContainer = document.querySelector('#discussions-list-users');

    setupDiscussions(discussionsContainer, viewManager, communicator);
    setupAddUserForm(communicator, [discussionsContainer, viewManager, communicator]);
    makeCollapsible(document.querySelector('#add-user')).collapse();

    return {
	getName: function() {
	    return name;
	},
	getElement: function() {
	    return element;
	}
    };
};

function setupDiscussions(container, viewManager, communicator) {
    communicator.send({
	action: 'getUsers'
    }, createDiscussions(container, viewManager));
}

function createDiscussions(discussionsContainer, viewManager) {
    return function(users) {
	if (!users) return;
	if (!Object.keys(users).length) return;

	Object.keys(users).forEach(function(user) {
	    var discussion = createDiscussion(users[user], viewManager);
	    discussionsContainer.appendChild(discussion);
	});
    };
}

function createDiscussion(user, viewManager) {
    var tr = document.createElement('tr');
    tr.className = 'discussion';
    tr.addEventListener('click', function() {
	viewManager.setView('discussion');
	var discussion = viewManager.getView('discussion');
	discussion.setUser(user);
	discussion.run();
    });

    var userTd = document.createElement('td');
    userTd.textContent = user.name;
    tr.appendChild(userTd);

    var emailTd = document.createElement('td');
    emailTd.textContent = user.email;
    tr.appendChild(emailTd);

    return tr;
}

function setupAddUserForm(communicator, initArgs) {
    var name = document.querySelector('#add-user-name');
    var email = document.querySelector('#add-user-email');
    document
	.querySelector('#add-user-submit')
	.addEventListener('click', addUser(communicator, name, email, initArgs));
}

function addUser(communicator, nameInput, emailInput, initArgs) {
    return function(e) {
	e.preventDefault();

	communicator.send({
	    action: 'addUser',
	    name: nameInput.value,
	    email: emailInput.value
	}, confirmAddUser(nameInput, emailInput, initArgs));
    };
}

function confirmAddUser(nameInput, emailInput, initArgs) {
    return function() {
	nameInput.value = '';
	emailInput.value = '';
	deleteDiscussions(initArgs[0]);
	setupDiscussions.apply(null, initArgs);
    };
}

function deleteDiscussions(container) {
    var discussions = container.querySelectorAll('.discussion');
    for (var i = 0; i < discussions.length; i++) {
	container.removeChild(discussions[i]);
    }
}
