require("dotenv").config();

const app = require("./app");

const mongoose = require("mongoose");

const { DB_HOST, PORT = 4000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    return app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
