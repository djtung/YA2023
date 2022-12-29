const express = require('express');
const consts = require('./consts.ts');

const app = express();
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set up a route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/process-input', (req, res) => {
    const input = req.body.input.toLowerCase();

    if (consts.ROUTES.hasOwnProperty(input)) {
        res.redirect(`/${consts.ROUTES[input]}.html`);
    } else {
      res.redirect(`/error.html`);
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});