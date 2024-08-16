// MODULES
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
require("express-async-errors");

const logger = require("./utils/logging/logger");

const app = express();

// ENV FILE CONFIGURATION
require("dotenv").config();

PORT = process.env.PORT || 5000;
DB_URL = process.env.DB_URL;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

mongoose.connect(DB_URL).then(() => {
  logger.log({
    level: "info",
    message: "Connected to DB",
  });
  app.listen(PORT, () =>
    logger.log({
      level: "info",
      message: `server running on port ${PORT}`,
    })
  );
});
//Ziad branch initial commit
