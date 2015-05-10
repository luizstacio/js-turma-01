(function () {
	var lista = [],
		novaLista,
		max = 10;

	while (--max) {
		lista.push({
			nome: 'luiz',
			idade: 23
		});
	}

	console.log(lista);
	novaLista = lista.map(
		function (pessoa) {
			return pessoa.nome;
		}
	);
	console.log(novaLista);
}());