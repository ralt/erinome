'use strict';

var byId = x => document.getElementById(x);
var byClass = x => document.querySelector('.' + x);

module.exports = function(buttons) {
    if (byClass('erinome-buttons')) return;
    let container = findContainer();
    container.insertBefore(buttons, container.firstChild);
};

function findContainer() {
    // We have to find the container from the editable
    let editable = byClass('editable');
    let firstTr = findParent(editable, 'TR');
    let containerTr = findParent(firstTr, 'TR');

    // Very-Gmail-specific selector.
    let selector = 'td>div>div>div:nth-child(4)>table>tbody>tr>td:nth-child(5)';

    return containerTr.nextElementSibling.querySelector(selector);
}

function findParent(el, nodeName) {
    let tmp = el;
    while (tmp.parentNode.nodeName !== nodeName) {
	tmp = tmp.parentNode;
    }
    return tmp.parentNode;
}
