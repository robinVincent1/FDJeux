require('dotenv').config();
const express = require('express');
const { db } = require('./app/models');
const cors = require('cors');
const app = express();
const sequelize = require('./db/conn');

const init = require('./init');

const allowedOrigins = [
  'http://localhost:3000',
];

app.use(cors({
  origin: allowedOrigins
}));
app.use(express.json());

// Ensure sequelize is properly initialized
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    return sequelize.sync(); // Sync the database
  })
  .then(() => {
    console.log('Synced db.');
    // Start the server after the database is synced
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err.message);
  });

app.get('/', function (req, res) {
  res.send('Server up');
});

require('./app/routes/user.route')(app);
require('./app/routes/jour.route')(app);
require('./app/routes/horaire.route')(app);
require('./app/routes/planning_general_ligne.route')(app);
require('./app/routes/creneau.route')(app);
require('./app/routes/infos.route')(app);
require('./app/routes/news.route')(app);
require('./app/routes/questionReponse.route')(app);
require('./app/routes/hebergement.route')(app);
require("./app/routes/festival.route")(app);
require('./app/routes/creneau_benevole.route')(app)
require('./app/routes/repas.route')(app);

