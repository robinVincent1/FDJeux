require('dotenv').config();
const express = require('express');
const { db } = require('./app/models');
const cors = require('cors');
const app = express();

const init = require('./init');

const allowedOrigins = [
  'http://localhost:4000',
];

app.use(cors({
  origin: allowedOrigins
}))
app.use(express.json());

db.sequelize
  .sync()
  .then(async () => {
    console.log('Synced db.');
  })
  .catch(err => {
    console.log('Failed to sync db: ' + err.message);
  });

app.get('/', function (req, res) {
  res.send('Server up');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Serveur is running on port ${port}`);
});