'use strict';

var qs = (x, c) => (c || document).querySelector(x);
var qsa = (x, c) => (c || document).querySelectorAll(x);

module.exports = function(compose, communicator, buttonsMaker) {
    qs(
	'.ip .cf[role=presentation]>tbody>tr>td:nth-child(2)'
    ).addEventListener('click', () => setTimeout(() => compose(communicator, buttonsMaker), 1000));
};
