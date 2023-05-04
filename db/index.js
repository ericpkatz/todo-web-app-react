const Sequelize = require('sequelize');
const conn = require('./conn');
const Todo = require('./Todo');
const Category = require('./Category');

Todo.belongsTo(Category);
Category.hasMany(Todo);

const seedData = async()=> {
  const categories = await Promise.all([
    Category.create({ name: 'pets'}),
    Category.create({ name: 'learning'}),
    Category.create({ name: 'chores'}),
    Category.create({ name: 'shopping'}),
  ]);
  const [pets, learning, chores] = categories;

  await Promise.all([
    Todo.create({ name: 'walk the dog', categoryId: pets.id}),
    Todo.create({ name: 'buy a chew toy', categoryId: pets.id}),
    Todo.create({ name: 'learn react', categoryId: learning.id}),
    Todo.create({ name: 'take out garbage', categoryId: chores.id })
  ]);
};

module.exports = {
  Todo,
  Category,
  conn,
  seedData
};

