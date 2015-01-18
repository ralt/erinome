'use strict';

var qsa = (x, c) => (c || document).querySelectorAll(x);

var verify = require('../buttons/verify');
var compose = require('./compose');
var setupCompose = require('../buttons/setup-compose');

module.exports = function init(communicator, buttonsMaker, acc = 0) {
    if (!onDiscussionPage()) {
	// if we're on the discussion page but without messages... it means we're loading.
	// So we have to wait a little bit and try again. Try 5 times max.
	if (acc < 5) setTimeout(() => init(communicator, buttonsMaker, ++acc), 1000);
	return;
    }

    verify(communicator);
    setupCompose(compose, communicator, buttonsMaker);
};

function onDiscussionPage() {
    // Very Specific Gmail Selector
    return qsa('[role=presentation]>tr>td>div:nth-child(2)>div:nth-child(2)>div>div:nth-child(3)>[tabindex]').length > 0;
}
