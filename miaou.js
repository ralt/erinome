(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
    var messages = document.querySelector('#messages');
    if (!messages) return;

    var name = 'Florian'; // @todo

    var observer = new MutationObserver(function(mutations) {
	var addedNodes;
	for (var i = 0; i < mutations.length; i++) {
	    addedNodes = mutations[i].addedNodes;
	    if (!addedNodes || !addedNodes.length) continue;
	    handleAddedNodes(mutations[i].addedNodes);
	}
    });

    observer.observe(messages, {childList: true});

    function handleAddedNodes(nodes) {
	var node;
	for (var i = 0; i < nodes.length; i++) {
	    node = nodes[i];
	    if (!/\bmessage\b/.test(node.className)) continue;

	    handleChildren(node.childNodes);
	}
    }

    function handleChildren(children) {
	var child;
	for (var i = 0; i < children.length; i++) {
	    child = children[i];
	    if (!/\bcontent\b/.test(child.className)) continue;
	    handleText(child);
	}
    }

    function handleText(child) {
	var text = child.innerText; // innerText préserve les \n contrairement à textContent...
	message = text.match(new RegExp('#pgp\n@' + name + '\n(.*)'));
	if (!message) return;
	
	chrome.runtime.sendMessage({action: 'decrypt', message: message[1]});
    }

    chrome.runtime.onMessage.addListener(function(request) {
	if (request.type !== 'encrypted') return;
	
	var pendingMessages = document.querySelector('#pending-messages');
	
	var div = document.createElement('div');
	div.textContent = '#pgp\n' +
	    '@' + request.name + '\n' +
	    request.message.join('\n');
	
	pendingMessages.appendChild(div);
    });

}());

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtaWFvdS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKCkge1xuICAgIHZhciBtZXNzYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZXNzYWdlcycpO1xuICAgIGlmICghbWVzc2FnZXMpIHJldHVybjtcblxuICAgIHZhciBuYW1lID0gJ0Zsb3JpYW4nOyAvLyBAdG9kb1xuXG4gICAgdmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24obXV0YXRpb25zKSB7XG5cdHZhciBhZGRlZE5vZGVzO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IG11dGF0aW9ucy5sZW5ndGg7IGkrKykge1xuXHQgICAgYWRkZWROb2RlcyA9IG11dGF0aW9uc1tpXS5hZGRlZE5vZGVzO1xuXHQgICAgaWYgKCFhZGRlZE5vZGVzIHx8ICFhZGRlZE5vZGVzLmxlbmd0aCkgY29udGludWU7XG5cdCAgICBoYW5kbGVBZGRlZE5vZGVzKG11dGF0aW9uc1tpXS5hZGRlZE5vZGVzKTtcblx0fVxuICAgIH0pO1xuXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShtZXNzYWdlcywge2NoaWxkTGlzdDogdHJ1ZX0pO1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlQWRkZWROb2Rlcyhub2Rlcykge1xuXHR2YXIgbm9kZTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuXHQgICAgbm9kZSA9IG5vZGVzW2ldO1xuXHQgICAgaWYgKCEvXFxibWVzc2FnZVxcYi8udGVzdChub2RlLmNsYXNzTmFtZSkpIGNvbnRpbnVlO1xuXG5cdCAgICBoYW5kbGVDaGlsZHJlbihub2RlLmNoaWxkTm9kZXMpO1xuXHR9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlQ2hpbGRyZW4oY2hpbGRyZW4pIHtcblx0dmFyIGNoaWxkO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdCAgICBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuXHQgICAgaWYgKCEvXFxiY29udGVudFxcYi8udGVzdChjaGlsZC5jbGFzc05hbWUpKSBjb250aW51ZTtcblx0ICAgIGhhbmRsZVRleHQoY2hpbGQpO1xuXHR9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlVGV4dChjaGlsZCkge1xuXHR2YXIgdGV4dCA9IGNoaWxkLmlubmVyVGV4dDsgLy8gaW5uZXJUZXh0IHByw6lzZXJ2ZSBsZXMgXFxuIGNvbnRyYWlyZW1lbnQgw6AgdGV4dENvbnRlbnQuLi5cblx0bWVzc2FnZSA9IHRleHQubWF0Y2gobmV3IFJlZ0V4cCgnI3BncFxcbkAnICsgbmFtZSArICdcXG4oLiopJykpO1xuXHRpZiAoIW1lc3NhZ2UpIHJldHVybjtcblx0XG5cdGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHthY3Rpb246ICdkZWNyeXB0JywgbWVzc2FnZTogbWVzc2FnZVsxXX0pO1xuICAgIH1cblxuICAgIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbihyZXF1ZXN0KSB7XG5cdGlmIChyZXF1ZXN0LnR5cGUgIT09ICdlbmNyeXB0ZWQnKSByZXR1cm47XG5cdFxuXHR2YXIgcGVuZGluZ01lc3NhZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BlbmRpbmctbWVzc2FnZXMnKTtcblx0XG5cdHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0ZGl2LnRleHRDb250ZW50ID0gJyNwZ3BcXG4nICtcblx0ICAgICdAJyArIHJlcXVlc3QubmFtZSArICdcXG4nICtcblx0ICAgIHJlcXVlc3QubWVzc2FnZS5qb2luKCdcXG4nKTtcblx0XG5cdHBlbmRpbmdNZXNzYWdlcy5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH0pO1xuXG59KCkpO1xuIl19
