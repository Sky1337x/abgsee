const express = require('express');
const path = require('path');

const dotenv = require('dotenv');
var favicon = require('serve-favicon')
const app = express();
app.use(favicon(path.join(__dirname, './public', 'favicon.ico')))
const port = 3000

dotenv.config({ path:'./.env'})


app.set('view engine','hbs');


const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory));


app.get('/', (req, res) => {
    res.render("index")
});

app.get('/notices', (req, res) => {
  res.render("notices")
});

app.get('/gallery', (req, res) => {
  res.render("gallery")
});

app.get('/memberlist', (req, res) => {
  res.render("members_list")
});

app.get('/about', (req, res) => {
  res.render("about")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});