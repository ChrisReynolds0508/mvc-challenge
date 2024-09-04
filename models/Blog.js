const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');

class Blog extends Model {}

Blog.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Blog'
});

module.exports = Blog;
