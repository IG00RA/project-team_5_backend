const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const httpMessage = require("./constants");

const authRouter = require("./routes/api/auth");
const { tasksRouter } = require("./routes/api/tasks");
const { reviewsRouter } = require("./routes/api/reviews");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/reviews", reviewsRouter);

app.use((req, res) => {
  res.status(404).json({ message: httpMessage[404] });
});

app.use((err, req, res, next) => {
  const { status = 500, message = httpMessage[500] } = err;
  res.status(status).json({ message });
});

module.exports = app;
