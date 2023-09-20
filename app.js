// src/app.js
const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const firebaseConfig = require("./src/config/firebaseConfig");
const userRoutes = require("./src/routes/userRoutes");
const goalRoutes = require("./src/routes/goalRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/goals", goalRoutes);
app.use("/tasks", taskRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
