const express = require('express');
const router = express.Router();

const namespaceOneRouter = require('./namespaceOne');

router.use('/one', namespaceOneRouter);
// could also shorthard router.use('/one', require('./namespaceOne'));

router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
