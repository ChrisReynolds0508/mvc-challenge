// const Sequelize = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(process.env.DB_URL, {
//   dialect: 'postgres',
//   logging: false
// });

// const User = require('./user');
// const Blog = require('./Blog');

// // Define associations
// User.hasMany(Blog, {
//   foreignKey: 'user_id'
// });
// Blog.belongsTo(User, {
//   foreignKey: 'user_id'
// });

// module.exports = { sequelize, User, Blog };

const { Sequelize } = require('sequelize');
require('dotenv').config();

const User = require('./User');
const Blog = require('./Blog'); // Adjust this path if necessary

User.hasMany(Blog, {
  foreignKey: 'user_id'
});
Blog.belongsTo(User, {
  foreignKey: 'user_id'
});


let sequelize;

if (process.env.DB_URL) {
  // Check if DB_URL is not empty
  if (!process.env.DB_URL.trim()) {
    throw new Error('DB_URL is empty');
  }
  
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    logging: false,
  });
} else {
  // Check if required environment variables are present
  if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD) {
    throw new Error('Database environment variables are missing');
  }

  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres',
      logging: false,
    }
  );
}

// module.exports = sequelize;

module.exports = { sequelize, User, Blog };