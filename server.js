const express = require('express');
const session = require('express-session');
const SequelizeStore  = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const path = require('path');
require('dotenv').config();

const { sequelize, User, Blog } = require('./models');
const blogRoutes = require('./controllers/api/blogRoutes');
const userRoutes = require('./controllers/api/userRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
});