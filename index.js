function collapse(element, collapseHeight) {
	var heightAtStart = element.scrollHeight;
	var transitionAtStart = element.style.transition;
	element.style.transition = '';

	requestAnimationFrame(function setStaticHeight() {
		element.style.height = heightAtStart + 'px';
		element.style.transition = transitionAtStart;

		requestAnimationFrame(function startTransition() {
			element.style.height = (collapseHeight || 0) + 'px';
		});
	});
}

function expand(element) {
	var moveTo = element.scrollHeight;
	element.style.height = moveTo + 'px';

	var callback = function unsetHeight() {
		element.removeEventListener('transitionend', callback);
		if (parseInt(element.style.height) === moveTo) {
			element.style.height = null;
		}
	};

	element.addEventListener('transitionend', callback);
}

function toggle(element, collapseHeight) {
	if (parseInt(element.style.height) <= (collapseHeight || 0)) {
		expand(element);
		return true;
	}

	collapse(element, collapseHeight);
	return false;

}

module.exports = toggle;
module.exports.toggle = toggle;
module.exports.expand = expand;
module.exports.collapse = collapse;