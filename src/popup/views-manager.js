'use strict';

var views = [];
var def;

module.exports = {
    add(view) {
	views[view.getName()] = view;
    },
    setDefault(view) {
	def = view.getName();
    },
    run() {
	showView(def);
    },
    setView(name) {
	showView(name);
    },
    getView(name) {
	return views[name];
    }
};

function showView(name) {
    Object.keys(views).forEach(function(view) {
        views[view].getElement().hidden = true;
    });
    views[name].getElement().hidden = false;
}
