const Sequelize = require('sequelize');
const db = require('../_db');

const Employer = db.define('employer', {
  name: Sequelize.STRING,
});

module.exports = Employer;
