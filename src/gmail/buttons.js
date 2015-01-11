'use strict';

module.exports = function(handlers) {
    let main = document.createElement('div');
    main.className = 'erinome-buttons';
    let defaultButton = getDefaultButton();
    let buttons = [
	createSignButton(defaultButton, handlers.sign),
	createSignEncryptButton(defaultButton, handlers.signEncrypt)
    ];
    for (let button of buttons) {
	main.appendChild(button);
    }
    return main;
};

function getDefaultButton() {
    let b = document.createElement('span');
    b.className = 'erinome-button';
    b.style.cursor = 'pointer';
    b.style.float = 'left';
    b.style.marginLeft = '5px';
    return b;
}

function createSignButton(defaultButton, clickHandler) {
    let b = defaultButton.cloneNode();
    b.className = 'erinome-button';
    b.textContent = 'S';
    b.title = 'Sign';
    b.addEventListener('click', clickHandler);
    return b;
}

function createSignEncryptButton(defaultButton, clickHandler) {
    let b = defaultButton.cloneNode();
    b.className = 'erinome-button';
    b.textContent = 'SE';
    b.title = 'Sign&Encrypt';
    b.addEventListener('click', clickHandler);
    return b;
}
