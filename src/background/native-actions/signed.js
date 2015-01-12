'use strict';

module.exports = function(communicator) {
    return function(obj) {
	communicator.sendTab({
	    action: 'gmailqueue',
	    id: obj.id,
	    text: obj.text
	});
    };
};
