window.addEventListener('load', () => {
	document.getElementById('form').addEventListener('submit', function(event) {
		event.preventDefault();

		const input = document.getElementById('input').value;

		const body = {
			input,
			location: window.location.pathname
		}

		fetch('/process-input', {
		  method: 'POST',
		  body: JSON.stringify(body),
		  headers: {
			'Content-Type': 'application/json'
		  }
		})
		.then(response => {
			window.location.href = response.url;
		})
		.catch(error => {
			console.error(error)
		});
	});
})