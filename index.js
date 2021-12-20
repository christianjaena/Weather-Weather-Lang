const mongoDBURI = require('./database/mongoDBConnection');
const userRoutes = require('./server/routes/userRoutes.js');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const app = express();
const PORT = process.env.PORT || 3000;
require('linqjs');

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

// ** SERVER AND DATABASE CONNECTION ** //
mongoose
  .connect(mongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('MongoDB Connected');

    app.listen(PORT, (error) => {
      if (error) throw error;
      console.log(`Server Running on http://localhost:${PORT}/`);
    });
  })
  .catch((error) => console.log(error));

const store = new MongoDBSession({
  uri: mongoDBURI,
  collection: 'sessions',
});

// ** MIDDLEWARES ** //
app.use(
  session({
    secret: 'WeatherWeatherLang',
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use(connectLiveReload());
app.use(express.static('client'));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ** ROUTES ** //
app.get('/auth', async (req, res) => {
  if (!req.session.isAuth) {
    res.redirect('/login');
  }
});

app.post('/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/login');
  });
});
app.use('/user', userRoutes);
