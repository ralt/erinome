function EventEmitter() {
    var listeners = {};

    return {
	on: function(event, fn) {
	    if (listeners[event]) {
		listeners[event].push(fn);
	    }
	    else {
		listeners[event] = [fn];
	    }
	},

	emit: function(event, obj) {
	    if (!listeners[event]) return;

	    listeners[event].forEach(function(fn) {
		fn(obj);
	    });
	}
    };
}
