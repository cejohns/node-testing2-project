// db-config.js

const knexConfig = require('./knexfile.js');
const environment = process.env.NODE_ENV || 'development';

console.log('Environment:', environment); // Debugging line

const config = knexConfig[environment];

if (!config) {
  console.error(`No knex configuration for environment: ${environment}`);
  process.exit(1);
}

module.exports = require('knex')(config);
