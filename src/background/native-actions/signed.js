'use strict';

module.exports = function(communicator) {
    return function(obj) {
	communicator.send({
	    action: 'gmailqueue',
	    id: obj.id,
	    text: obj.text
	});
    };
};
