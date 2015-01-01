'use strict';

module.exports = function(communicator) {
    return function(obj) {
	communicator.sendTab({
	    action: 'encrypted',
	    message: obj.text,
	    name: obj.name
	});
    };
};
