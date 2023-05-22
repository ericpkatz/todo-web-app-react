const Sequelize = require('sequelize');
const conn = require('./conn');

const Todo = conn.define('todo', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    unique: true
  },
});

module.exports = Todo;

