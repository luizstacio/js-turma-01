(function () {
	var $elementos = modulo.find('#btn');

	modulo.on($elementos, 'click',
		function () {
			alert('click');
		}
	);
}());
