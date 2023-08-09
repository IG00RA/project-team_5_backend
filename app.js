const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const httpMessage = require("./constants");
require("dotenv").config();

const authRouter = require("./routes/api/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: httpMessage[404] });
});

app.use((err, req, res, next) => {
  const { status = 500, message = httpMessage[500] } = err;
  res.status(status).json({ message });
});

module.exports = app;
