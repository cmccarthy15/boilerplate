const Employer = require('./employer');
const User = require('./user');

User.belongsTo(Employer);

module.exports = {
  User,
  Employer
};

