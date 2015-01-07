'use strict';

module.exports = function(el, viewsManager) {
    return {
	setup: function() {
	    el.addEventListener('change', function() {
		viewsManager.setView(this.value);
	    });
	}
    };
};
