// Create express server
const express = require('express');
const cors = require('cors');

// Routers
const { todosRouter } = require('./routes/todos.routes');

// Utilis
const { sequelize } = require('./utils/database');

// Init app
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/todos', todosRouter);

sequelize
  .authenticate()
  .then(() => console.log('Database authenticaded'))
  .catch((err) => console.log(err));

sequelize
  .sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

// Run server

app.listen(4000, () => {
  console.log('To do api running!');
});
