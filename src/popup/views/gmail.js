'use strict';

var byId = function(id) { return document.getElementById(id); };

module.exports = function(viewsManager, communicator) {
    var name = 'gmail';
    var element = byId('gmail');

    return {
	getName() {
	    return name;
	},
	getElement() {
	    return element;
	}
    };
};
