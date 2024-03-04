const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

db.createTable();

app.post('/addNewCard', (req, res) => {
  console.log(req.body);
  db.addCard(req.body);
});

app.get('/getCardData', async (req, res) => {
  cards = await db.getAllCards();
  res.send(cards);
});

app.get('/getData', async (req, res) => {
  
})

app.post('/deleteCard', async (req, res) => {
  console.log(req.body);
  db.deleteCardContent(req.body);
})

app.get('/html', (req, res) => {
  res.sendFile(__dirname + '/scrum-board-UI.html');
});

app.get('/credits', (req, res) => {
  res.sendFile(__dirname + '/credits.html');
});

app.get('/images/JB', (req, res) => {
  res.sendFile(__dirname + '/jb.png');
});

app.get('/creditsCss', (req, res) => {
  res.sendFile(__dirname + '/credits.css');
});

app.get('/credits', (req, res) => {
  res.sendFile(__dirname + '/credits.js');
});

app.get('/Style', (req, res) => {
  res.sendFile(__dirname + 'D:\Scrum-Board-Project-Ordentlich\scrum-board-ui-style.css');
});

app.get('/js', (req, res) => {
  res.sendFile(__dirname + 'D:\Scrum-Board-Project-Ordentlich\scrum-board-functions.js');
});

app.get('/images/background', (req, res) => {
  res.sendFile(__dirname + '/space.jpg');
});

app.get('/images/addCardButton', (req, res) => {
  res.sendFile(__dirname + '/plus.png');
});

app.get('/images/trashButton', (req, res) => {
  res.sendFile(__dirname + '/Trash.png');
});

app.listen(port, () => {
  console.log(`Gedränge-Brett hört on port ${port}`);
});

app.get('/', (req, res) => {});

app.get('/JB', (req, res) => {});

process.on('SIGINT', () => {
  // db.close();
});
