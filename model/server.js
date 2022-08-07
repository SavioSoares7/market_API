const express = require("express");
const app = express();

const database = require("./database/sqlite");
database();

const routes = require("./routes");
const AppError = require("./util/AppError");

app.use(express.json());
app.use(routes);

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "Error",
      message: error.message,
    });
  }
  return res.status(500).json({
    status: "Error",
    message: error,
  });
});

const PORT = 3000;
app.listen(PORT, console.log(`Server is running at Port: ${PORT}`));
