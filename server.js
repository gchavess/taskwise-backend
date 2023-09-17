const express = require("express");
const knex = require("knex");
const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/loginRoutes");
const goalRoutes = require("./routes/goalRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const port = process.env.PORT || 3000;

const knexConfig = require("./config/knexfile");

const db = knex(knexConfig.development);

app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/goals", goalRoutes);
app.use("/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
