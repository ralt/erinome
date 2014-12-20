'use strict';

module.exports = function(viewManager, storageManager) {
    var name = 'discussions-list';
    var element = document.querySelector('#discussions-list');

    setupDiscussions(element, viewManager, storageManager);
    setupAddUserForm(storageManager);

    return {
	getName: function() {
	    return name;
	},
	getElement: function() {
	    return element;
	}
    };
};

function setupDiscussions(container, viewManager, storageManager) {
    return getUsers(storageManager).then(createDiscussions(container, viewManager));
}

function getUsers(storageManager) {
    return storageManager.get(null).then(function(s) {
	console.log(s);
	return storageManager.get('users');
    });
}

function createDiscussions(discussionsContainer, viewManager) {
    return function(users) {
	if (!Object.keys(users).length) return;
	
	Object.keys(users).forEach(function(user) {
	    var discussion = createDiscussion(users[user], viewManager);
	    discussionsContainer.appendChild(discussion);
	});
    };
}

function createDiscussion(user, viewManager) {
    var div = document.createElement('div');
    div.className = 'discussion';
    div.textContent = user.name;
    div.addEventListener('click', function() {
	viewManager.setView('discussion');
	viewManager.getView('discussion').setUser(user).run();
    });
}

function setupAddUserForm(storageManager) {
    var name = document.querySelector('add-user-name');
    var email = document.querySelector('add-user-email');
    document
	.querySelector('#add-user-submit')
	.addEventListener('click', addUser(storageManager, name, email));
}

function addUser(storageManager, nameInput, emailInput) {
    return function(e) {
	e.preventDefault();

	storageManager.get('users').then(function(users) {
	    users[nameInput.value] = {
		name: nameInput.value,
		email: emailInput.value
	    };
	    return users;
	}).then(function(users) {
	    return storageManager.set(users);
	});
    };
}
