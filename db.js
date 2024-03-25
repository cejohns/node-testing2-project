const knex = require('./db-config');

const getUsers = () => {
  return knex('users').select('*');
};

const addUser = (user) => {
  return knex('users').insert(user);
};

module.exports = { getUsers, addUser };
