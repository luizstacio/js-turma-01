(function () {
	var $addPhone = modulo.find('.add-phone'),
		$form = modulo.find('#user-form');

	modulo.on($addPhone, 'click', function (e) {
		var $li = document.createElement('li'),
			$ul = e.target.parentNode.querySelector('.phone-list'),
			tmpl = '<input type="phone" name="phone[]" placeholder="Telefone (ex.: (099) 9999-9999)">';
		
		$li.innerHTML += tmpl;


		$ul.appendChild($li);
	});

	modulo.on($form, 'submit', function (e) {
		var data = {
			name: $form[0].querySelector('[name="name"]').value,
			email: $form[0].querySelector('[name="email"]').value,
			phones: modulo.find('[name="phone[]"]').map(function ($input) {
				return $input.value;
			})
		}

		console.log(data);

		modulo.ajax({
			method: 'POST',
			url: 'http://api.achronic.com/users',
			data: data,
			callback: function (data) {
				$form[0].reset();
				$form[0].querySelector('.success').style.opacity = 1;
				setTimeout(function () {
					$form[0].querySelector('.success').style.opacity = 0;
				}, 2000);
			}
		});

		e.preventDefault();
	})
}());
