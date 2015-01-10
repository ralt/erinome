'use strict';

module.exports = function() {
    let main = document.createElement('div');
    main.className = 'erinome-buttons';
    let defaultButton = getDefaultButton();
    for (let button of [createSignButton, createSignEncryptButton].map(x => x(defaultButton))) {
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

function createSignButton(defaultButton) {
    let b = defaultButton.cloneNode();
    b.className = 'erinome-button';
    b.textContent = 'S';
    b.title = 'Sign';
    return b;
}

function createSignEncryptButton(defaultButton) {
    let b = defaultButton.cloneNode();
    b.className = 'erinome-button';
    b.textContent = 'SE';
    b.title = 'Sign&Encrypt';
    return b;
}
