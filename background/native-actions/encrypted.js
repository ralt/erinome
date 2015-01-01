'use strict';

module.exports = function(communicator) {
    return function(obj) {
	communicator.sendTab({
	    type: 'encrypted',
	    message: obj.text,
	    name: obj.name
	});
    };
};
