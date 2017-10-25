const Place = require('./place');
const Person = require('./person');

Person.belongsTo(Place);

module.exports = {
  Person,
  Place
};
