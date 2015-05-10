(function () {
	var objeto = {},
		keys;

	objeto.nome = 'luiz';
	objeto.email = 'luizstacio@gmail.com';
	objeto.telefone = 4899114999;
	objeto.idade = 21;
	objeto['sobrenome'] = 'estácio';

	keys = Object.keys(objeto);
	keys.forEach(function (key) {
		console.log(key, objeto[key]);
	});

	console.log('');
	delete objeto.sobrenome;

	keys = Object.keys(objeto);
	keys.forEach(function (key) {
		console.log(key, objeto[key]);
	});

	console.log(keys);
}());