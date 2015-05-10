(function () {
	var dc = document;

	modulo = {
		find: function (selector) {
			var $elements = dc.querySelectorAll(selector);
			
			return Array.prototype.concat.apply([], $elements);
		},
		on: function ($elements, evt, fn) {
			$elements.forEach(function ($element) {
				$element.addEventListener(evt, fn);
			});
		}
	}
}());
