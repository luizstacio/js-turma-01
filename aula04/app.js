(function () {
	var $addPhone = modulo.find('.add-phone'),
		$formTask = modulo.find('#tasks-form.new-task'),
		$formSearch = modulo.find('#search-form'),
		$form = modulo.find('#user-form');


	function save (user) {
		var users = JSON.parse(localStorage.getItem('users'));
		users.forEach(function (item, index) {
			if ( item._id === user._id ) {
				users[index] = user;
			}
		});
		localStorage.setItem('USER', JSON.stringify(user));
		localStorage.setItem('users', JSON.stringify(users));
	}

	modulo.on($addPhone, 'click', function (e) {
		var $li = document.createElement('li'),
			$ul = e.target.parentNode.querySelector('.phone-list'),
			tmpl = '<input type="phone" name="phone[]" placeholder="Telefone (ex.: (099) 9999-9999)">';
		
		$li.innerHTML += tmpl;


		$ul.appendChild($li);
	});

	modulo.on($formTask, 'submit', function (e) {
		e.preventDefault();

		var user = JSON.parse(localStorage.getItem('USER'));

		user.tasks.push({
			title: $formTask[0].querySelector('[name="title"]').value,
			description: $formTask[0].querySelector('[name="description"]').value,
			finished: false
		});

		save(user);
		alert('Nova tarefa cadastrada.');
		e.target.reset();
		listarTarefas();
	});

	modulo.on($formSearch, 'submit', function (e) {
		var users = JSON.parse(localStorage.getItem('users')), user;
		
		function resultSearch (data) {
			var user = data.filter(function (user) {
				return user.email === e.target.querySelector('[name=email]').value;
			});

			localStorage.setItem('USER', JSON.stringify(user[0]));
			listarTarefas();

			modulo.find('.search-container')[0].style.display = 'none';
			modulo.find('.tasks-container')[0].style.display = 'block';
		}

		if ( users ) {
			resultSearch(users);
		} else {
			modulo.ajax({
				method: 'GET',
				url: 'http://api.achronic.com/users',
				callback: function (data) {
					resultSearch(data.data);
				}
			})
		}

		e.preventDefault();
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

	function addEvents () {
		var $btnFinished = modulo.find('.task-finished'),
			$btnEditTask = modulo.find('.btn-edit-task'),
			user = JSON.parse(localStorage.getItem('USER'));
	
		modulo.on($btnFinished, 'change', function (e) {
			var index = e.target.dataset.taskid;

			user.tasks[index].finished = (e.target.value === 'on');
			save(user);
		});

		modulo.on($btnEditTask, 'click', function (e) {
			var index = e.target.dataset.taskid;

			user.tasks[index].description = e.target.parentNode.querySelector('[name="description"]').value;
			alert('Descrição alterada.')
			save(user);
		});
	}

	function listarTarefas () {
		var $ulTasks = document.querySelector('.tasks-list'),
			tmpl,
			i = 0,
			user = JSON.parse(localStorage.getItem('USER'));

		$ulTasks.innerHTML = '';

		user.tasks.forEach(function (task, index) {
			var $li = document.createElement('li'),
			tmpl = ('<h3>' + task.title + '</h3><input class="task-finished" data-taskId="' + index + '" type="checkbox" ' + (task.finished ? 'checked' : '') + '>'+
					'<form id="tasks-form" action="">'+
						'<textarea name="description">' + task.description + '</textarea>'+
					'</form><button data-taskId="' + index + '" class="btn-edit-task">Editar</button>');

			$li.classList.add('tasks-item');
			$li.innerHTML += tmpl;

			$ulTasks.appendChild($li);
		});

		addEvents();
	}
}());
