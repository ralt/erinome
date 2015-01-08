'use strict';

module.exports = function(el, viewsManager) {
    return {
	setup() {
	    el.addEventListener('change', function() {
		viewsManager.setView(this.value);
	    });
	}
    };
};
