const express = require('express');
const consts = require('./consts.ts');

const app = express();
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public/'));

// Set up a route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/process-input', (req, res) => {
    const input = req.body.input.toLowerCase().trim();
    const locationRaw = req.body.location.split("/");
    const location = locationRaw[locationRaw.length - 1];

    const matchingRoute = consts.ROUTES.find(route => {
      const answerMatches = route.answer.some(answer => answer.toLowerCase() === input);
      return answerMatches && route.current === location
    });

    if (matchingRoute) {
        res.redirect(`/${matchingRoute.next}.html`);
    } else {
      if (!location) {
        res.redirect(`/errors/generic.html`);
      } else {
        res.redirect(`/errors/${location}`);
      }
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});