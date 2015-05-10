(function () {
	var lista = [1,2,3,4,5,6,7,8,9,10],
		lista2 = [11,12,13,14],
		novaLista;
	// console.log(lista[0]);
	//lista[0] = 0;
	//console.log(lista[0]);

	novaLista = lista.concat(lista2);
	
	console.log(novaLista);
	console.log(lista);
	console.log(lista2);
}());