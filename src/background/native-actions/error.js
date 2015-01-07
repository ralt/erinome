'use strict';

var errors = {
    encrypt: encryptError,
    decrypt: decryptError
};

module.exports = function() {
    return function(obj) {
	errors[obj.type]();
    };
};

function encryptError() {
    alert('There was an error encrypting. Are you sure you trust the person?');
}

function decryptError() {
    alert("There was an error decrypting. Are you sure you're the receiver?");
}
