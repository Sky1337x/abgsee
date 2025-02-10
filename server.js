const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');
var favicon = require('serve-favicon')
const app = express();
app.use(favicon(path.join(__dirname, './public', 'favicon.ico')))
const port = 3000

dotenv.config({ path:'./.env'})

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});


app.set('view engine','hbs');


const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory));

db.connect((error) => {
  if(error){
    console.log(error)
  }
  else{
    console.log("sql connected")
  }
});

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