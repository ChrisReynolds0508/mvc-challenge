const Sequelize = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  logging: false
});

const User = require('./user');
const Blog = require('./Blog');

// Define associations
User.hasMany(Blog, {
  foreignKey: 'user_id'
});
Blog.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { sequelize, User, Blog };
