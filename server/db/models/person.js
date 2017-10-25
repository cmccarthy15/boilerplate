const Sequelize = require('sequelize');
const db = require('../db');

const Person = db.define('person', {
  name: Sequelize.STRING,
});

module.exports = Person;
