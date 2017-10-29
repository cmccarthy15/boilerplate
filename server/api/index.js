const express = require('express');
const router = express.Router();

const namespaceOneRouter = require('./namespaceOne');

const { User } = require('../db');

router.use('/one', namespaceOneRouter);
// could also shorthard router.use('/one', require('./namespaceOne'));

router.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) res.status(401).send('User not found');
      else if (!user.correctPassword(req.body.password)) res.status(401).send('Incorrect password');
      else {
        req.login(user, err => {
          if (err) next(err);
          else res.json(user);
        });
      }
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      console.log(user);
      req.login(user, err => {
        if (err) next(err);
        else res.json(user);
      });
    })
    .catch(next);
});

// To log out, we need to destroy the user on our session. Passport makes this very easy by attaching a logout method to the request object.
router.post('/logout', (req, res, next) => {
  req.logout();
  res.sendStatus(200);
});


// fetch the logged-in user on our session. Our client will make this request every time the client application loads - this allows us to keep the user logged in on the client even after they refresh.
// Since passport attaches the session user to the request object, this should be straightforward as well.
router.get('/me', (req, res, next) => {
  res.json(req.user);
});

router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
