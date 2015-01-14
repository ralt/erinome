'use strict';

var qs = x => document.querySelector(x);
var qsa = x => document.querySelectorAll(x);

module.exports = function(communicator) {
    if (!onDiscussionPage()) return;

    let addButtonsMaker = addButtons(communicator);
    let messages = qs('[role=presentation]>tr>td>div:nth-child(2)>div:nth-child(2)>div>div:nth-child(3)');
    messages.addEventListener('click', addButtonsMaker);
    addButtonsMaker.call(messages);
};

function addButtons(communicator) {
    return function() {
	let erinomeVerify = Array.from(this.querySelectorAll('.erinome-verify'));
	if (erinomeVerify) erinomeVerify.forEach(el => el.remove());
	Array.from(this.children)
	    .filter(el => el.getAttribute('tabindex') !== null)
	    .forEach(addVerifyButton(communicator));
    };
}

function onDiscussionPage() {
    // Very Specific Gmail Selector
    return qsa('[role=presentation]>tr>td>div:nth-child(2)>div:nth-child(2)>div>div:nth-child(3)>[tabindex]').length > 0;
}

function addVerifyButton(communicator) {
    return function(el) {
	let button = document.createElement('div');
	button.className = 'erinome-verify';
	button.textContent = 'V';
	button.style.background = 'aliceblue';
	button.style.width = '25px';
	button.style.height = '25px';
	button.style.fontSize = '20px';
	button.style.textAlign = 'center';
	button.style.cursor = 'pointer';
	el.querySelector('table>tbody>tr>td:nth-child(2)>div').appendChild(button);
	button.addEventListener('click', verifyEmail(communicator));
    };
}

function findParent(el, nodeName) {
    let tmp = el;
    while (tmp.parentNode.nodeName !== nodeName) {
	tmp = tmp.parentNode;
    }
    return tmp.parentNode;
}

function verifyEmail(communicator) {
    return function() {
	let self = this;
	let email = findParent(this, 'TABLE').parentNode.parentNode.children[5];
	communicator.send({
	    action: 'verify',
	    text: email.innerText
	}).then(function(obj) {
	    self.style.background = obj.status === 0 ? 'green' : 'red';
	}).done();
    };
}
