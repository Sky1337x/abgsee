const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
var favicon = require('serve-favicon');

const app = express();
const port = 3000;

// Load environment variables
dotenv.config({ path: './.env' });

// Set views folder correctly
app.set('views', path.join(__dirname, 'views'));

// Set view engine to Handlebars
app.set('view engine', 'hbs');

// Serve static files (like images, CSS, etc.)
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Serve favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Define routes
app.get('/', (req, res) => {
    res.render("index"); // render index.hbs
});

app.get('/notices', (req, res) => {
  res.render("notices"); // render notices.hbs
});

app.get('/gallery', (req, res) => {
  res.render("gallery"); // render gallery.hbs
});

app.get('/memberlist', (req, res) => {
  res.render("members_list"); // render members_list.hbs
});

app.get('/about', (req, res) => {
  res.render("about"); // render about.hbs
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
