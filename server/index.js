// MODULES
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
require("express-async-errors");
const cookieParser = require("cookie-parser");

const logger = require("./utils/logging/logger");
const errorHandler = require("./middlewares/errorHandler");

const userRoutes = require("./routes/users.routes");
const productRoutes = require("./routes/products.routes");
const cartRoutes = require("./routes/cart.routes");

const app = express();

// ENV FILE CONFIGURATION
require("dotenv").config();

PORT = process.env.PORT;
DB_URL = process.env.DB_URL;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

app.use(errorHandler);

mongoose
  .connect(DB_URL)
  .then(() => {
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
  })
  .catch((err) => {
    logger.log({
      level: "error",
      message: "Couldn't Connect to DB, Please Check Your Internet Connection",
    });
  });
