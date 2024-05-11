const path = require('path');

module.exports = {
  config: path.resolve('config', 'database.js'),
  dialect: 'mysql',
  database: 'doggiebag_db',
  username: 'root', 
  password: 'PassWord1'
};