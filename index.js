function collapse(element, collapseHeight) {
	var heightAtStart = element.scrollHeight;
	var transitionAtStart = element.style.transition;
	element.style.transition = '';

	requestAnimationFrame(function() {
		element.style.height = heightAtStart + 'px';
		element.style.transition = transitionAtStart;

		requestAnimationFrame(function() {
			element.style.height = collapseHeight + 'px';
		});
	});
}

function expand(element) {
	var moveTo = element.scrollHeight;
	element.style.height = moveTo + 'px';

	var callback = function() {
		element.removeEventListener('transitionend', callback);
		if (parseInt(element.style.height) === moveTo) {
			element.style.height = null;
		}
	};
	
	element.addEventListener('transitionend', callback);
}

function toggle(element, collapseHeight) {
	collapseHeight = collapseHeight || 0;

	if (parseInt(element.style.height) === collapseHeight) {
		expand(element);
		return true;
	} else {
		collapse(element, collapseHeight);
		return false;
	}
}

module.exports = toggle;
module.exports.toggle = toggle;
module.exports.expand = expand;
module.exports.collapse = collapse;