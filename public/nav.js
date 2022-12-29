window.addEventListener('load', () => {
	document.getElementById('form').addEventListener('submit', function(event) {
		event.preventDefault();
	  
		const input = document.getElementById('input').value;
	  
		fetch('/process-input', {
		  method: 'POST',
		  body: JSON.stringify({ input }),
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

