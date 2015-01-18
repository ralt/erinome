'use strict';

var qs = (x, c) => (c || document).querySelector(x);
var qsa = (x, c) => (c || document).querySelectorAll(x);

module.exports = function(communicator) {
    let messages = qs('[role=presentation]>tr>td>div:nth-child(2)>div:nth-child(2)>div>div:nth-child(3)');
    let addButtonsMaker = addButtons(communicator);
    let verifyButtonMaker = addVerifyButton(communicator);

    Array.from(qsa('.kv', messages))
	.forEach(el => el.addEventListener('click', function() {
	    if (qsa('.erinome-verify', this).length !== 0) return;
	    verifyButtonMaker(this);
	}));
    addButtonsMaker.call(messages);
};

function addButtons(communicator) {
    return function() {
	if (qsa('.erinome-verify', this).length !== 0) return;

	Array.from(this.children)
	    .filter(el => el.getAttribute('tabindex') !== null)
	    .forEach(addVerifyButton(communicator));
    };
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
	qs('table>tbody>tr>td:nth-child(2)>div', el).appendChild(button);
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
    return function(e) {
	e.stopPropagation();
	let self = this;
	let email = findParent(this, 'TABLE').parentNode.parentNode.children[5];
	let text = cleanText(email.innerText);
	communicator.send({
	    action: 'verify',
	    text: text
	}).then(function(obj) {
	    self.style.background = obj.result === 0 ? 'green' : 'red';
	}).done();
    };
}

/**
 * Email texts on gmail sometimes have ugly chars.
 * Namely, &nbsp;.
 */
function cleanText(text) {
    return text.replace(/\u00A0/g, ' ');
}
