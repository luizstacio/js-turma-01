(function () {
	var $addPhone = modulo.find('.add-phone'),
		$form = modulo.find('#user-form'),
		tpmlTaks = ('<h3>Nova tarefa</h3><input class="task-finished" type="checkbox">'+
					'<form id="tasks-form" action="">'+
						'<input type="text" name="title" value="">'+
						'<textarea name="description"></textarea>'+
					'</form>');

	modulo.on($addPhone, 'click', function (e) {
		var $li = document.createElement('li'),
			$ul = e.target.parentNode.querySelector('.phone-list'),
			tmpl = '<input type="phone" name="phone[]" placeholder="Telefone (ex.: (099) 9999-9999)">';
		
		$li.innerHTML += tmpl;


		$ul.appendChild($li);
	});

	modulo.on($form, 'submit', function (e) {
		modulo.ajax({
			method: 'POST',
			url: 'http://api.achronic.com/users',
			data: modulo.parseFormToJson(e.target),
			callback: function (data) {
				$form[0].reset();
				$form[0].querySelector('.success').style.opacity = 1;
				setTimeout(function () {
					$form[0].querySelector('.success').style.opacity = 0;
				}, 2000);
			}
		});

		e.preventDefault();
	});


	function listarTarefas () {
		var $ulTasks = document.querySelector('.tasks-list'),
			tmpl;

		for (var i = 10; i >= 0; i--) {
			var $li = document.createElement('li'),
			tmpl = tpmlTaks;

			$li.classList.add('tasks-item');
			$li.innerHTML += tmpl;

			$ulTasks.insertBefore($li, $ulTasks.lastElementChild);
		};
	}

	listarTarefas();

}());
