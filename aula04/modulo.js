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
		},
		evalKey: function (objct, name, value) {
			var keys = name.split('.'),
				return_object = objct;

			keys.forEach(function (key, index) {
				if ((value !== undefined) && (index == keys.length - 1)) return_object[key] = value;
				if (index != keys.length - 1) return_object[key] = return_object[key] || {};

				return_object = return_object[key];
			});


			return return_object;
		},
		parseFormToJson: function (form, config) {
			// seta valor deafult para config
			config = config || {};

			var $inputs = toArray(form.querySelectorAll('[name]')),
				json_return = {};


			$inputs.forEach(function ($input) {
				var name = $input.name,
					value = $input.value,
					isAssociation = !!~name.indexOf('.'), list;

				if ( !name ) return;

				//verifica se o nome é um array
				if ( !!~name.indexOf('[]') ) {
					//retira as chaves do nome
					name = name.replace('[]', '');

					//pluraliza as chaves
					if ( !config.notPluralize ) {
						name = name.replace(/([a-z]+$)/ig, '$1s');
					}

					//caso tenha associações
					if ( isAssociation ) {
						list = modulo.evalKey(json_return, name);
					} else {
						list = json_return[name];
					}

					//verifica se esse array já existe
					if ( list ) {
						//caso sim adiciona o valor no array
						list.push(value);
					} else {
						//caso não cria um array literal com o valor
						modulo.evalKey(json_return, name, [value]);
					}
				} else {
					//caso o nome não for um array insere o valor na chave correspondente
					if ( isAssociation ) {
						modulo.evalKey(json_return, name, value);
					} else {
						json_return[name] = value;
					}
				}
			});

			return json_return;
		}
	}
}());
