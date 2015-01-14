'use strict';

var byId = x => document.getElementById(x);
var byClass = x => document.querySelector('.' + x);

var backgroundQueue = require('../background-queue');

module.exports = function(communicator, buttonsMaker) {
    if (byClass('erinome-buttons')) return;
    let container = findContainer();
    let queue = backgroundQueue(communicator);
    let buttons = buttonsMaker({
	sign: signHandler(queue),
	signEncrypt: signEncryptHandler(queue)
    });
    container.insertBefore(buttons, container.firstChild);
};

function signHandler(communicator) {
    return function() {
	let message = byClass('editable');
	communicator.send({
	    action: 'sign',
	    text: message.innerText // textContent doesn't keep \n
	}).then(function(obj) {
	    message.innerText = obj.text.join('\n');
	}).done();
    };
}

function signEncryptHandler(communicator) {
    return function() {
	let message = byClass('editable');
	let recipient = findRecipient(message);
	communicator.send({
	    action: 'signencrypt',
	    text: message.innerText,
	    recipient: recipient.getAttribute('email')
	}).then(function(obj) {
	    message.innerText = obj.text.join('\n');
	}).done();
    };
}

function findRecipient(editable) {
    // Super Gmail Specific Thingie
    return findParent(
	findParent(
	    findParent(
		editable,
		'TABLE'
	    ),
	    'TABLE'
	),
	'TABLE'
    ).querySelector('.oj>div>div>span');
}

function findContainer() {
    // We have to find the container from the editable
    let editable = byClass('editable');
    let firstTr = findParent(editable, 'TR');
    let containerTr = findParent(firstTr, 'TR');

    // Very-Gmail-specific selector.
    let selector = 'td>div>div>div:nth-child(4)>table>tbody>tr>td:nth-child(5)';

    return containerTr.nextElementSibling.querySelector(selector);
}

function findParent(el, nodeName) {
    let tmp = el;
    while (tmp.parentNode.nodeName !== nodeName) {
	tmp = tmp.parentNode;
    }
    return tmp.parentNode;
}
