const express = require('express');
const app = express();

const session = require('express-session'); // could also attach to a router our app uses
const passport = require('passport');

const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const apiRouter = require('./api');

const { db, User } = require('./db');

// configure and create our database store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });

// sync so that our session table gets created
dbStore.sync();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'node_modules')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// "Session" middleware needs to be before any routing middleware
// used to require cookie parsing middleware but this version handles that
// plug the store into our session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  // set SESSION_SECRET on deployment server. as long as access to server is protected
  // then you're good!
  store: dbStore,
  resave: false,
  saveUninitialized: false
}));

// has to go AFTER session middleware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

app.use('/api', apiRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!

db.sync()
  .then( () => {
    app.listen(port, function () {
      console.log('Knock, knock');
      console.log("Who's there?");
      console.log(`Your server, listening on port ${port}`);
    });
  })
  .catch(err => console.log('err occurred', err.message));

