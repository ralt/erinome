'use strict';

module.exports = function(fieldset) {
    fieldset.classList.add('collapsible');

    var collapsed = false;
    fieldset.querySelector('legend').addEventListener('click', function() {
	collapsed ? uncollapse(fieldset) : collapse(fieldset);
	collapsed = !collapsed;
    });

    return {
	collapse() {
	    collapsed = true;
	    collapse(fieldset);
	}
    };
};

function uncollapse(fieldset) {
    var elements = fieldset.querySelectorAll('*');
    Array.from(elements).forEach(el => el.style.display = 'block');
}

function collapse(fieldset) {
    var elements = fieldset.querySelectorAll('*');
    Array.from(elements).forEach(el => el.style.display = 'none');
    fieldset.querySelector('legend').style.display = 'block';
}
