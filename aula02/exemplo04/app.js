(function () {
	var lista = [1,2,3,4,5,6,7,8,9,10];
	
	console.log(lista);
	//valor, posição, lista/Array
	lista.forEach(
	function (item, index, _lista) {
		_lista[index] = item * 2;
	}
	);
	console.log(lista);
}());