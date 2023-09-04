const express = require('express');
const knex = require('knex');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const goalRoutes = require('./routes/goalRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRoutes);
app.use('/login', loginRoutes);
app.use('/goals', goalRoutes);
app.use('/tasks', taskRoutes);

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
