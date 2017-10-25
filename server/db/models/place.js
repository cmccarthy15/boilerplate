const Sequelize = require('sequelize');
const db = require('../db');

const Place = db.define('place', {
  name: Sequelize.STRING,
});

module.exports = Place;
