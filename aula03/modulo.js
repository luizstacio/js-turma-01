(function () {
	var dc = document,
		ajax = new XMLHttpRequest();

	function toArray ($elements) {
		return Array.prototype.concat.apply([], $elements);
	}

	modulo = {
		find: function (selector) {
			var $elements = dc.querySelectorAll(selector);
			
			return toArray($elements);
		},
		on: function ($elements, evt, fn) {
			$elements.forEach(function ($element) {
				$element.addEventListener(evt, fn);
			});
		},
		ajax: function (config) {
			ajax.open(config.method, config.url);
			ajax.onload = function (resp) {
				var data = JSON.parse(resp.currentTarget.response);

				config.callback(data);
			};
			ajax.send(JSON.stringify(config.data || {}), 'application/json');
		}
	}
}());
