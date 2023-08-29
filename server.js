const express = require('express');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const knex = require('knex'); // Importe o Knex

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRoutes);
app.use('/login', loginRoutes);

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development); // Configuração do banco de dados

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
