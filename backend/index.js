const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({ extended: true })
);

app.get('/', (request, response) => {
  response.json({ info: 'It works!' })
});

const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');

app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);

const {
  SERVERPORT: PORT
} = process.env;
console.log('env: ', process.env);
const db = require('./persistence');

db.init().then(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}).catch((err) => {
  console.error(err);
  process.exit(1);
});

// app.listen(PORT, () => {
//   console.log(`Backend start listening on port ${PORT} `);
// });

// const gracefulShutdown = () => {
//   db.teardown()
//     .catch(() => {})
//     .then(() => process.exit());
// };

// process.on('SIGINT', gracefulShutdown);
// process.on('SIGTERM', gracefulShutdown);
// process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon