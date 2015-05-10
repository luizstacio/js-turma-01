(function () {
	var lista = [1,2,3,4,5,6,7,8,9,10];

	lista.sort(function (a, b) {
		return a > b ? 1 : -1;
	});

	console.log(lista);
}());