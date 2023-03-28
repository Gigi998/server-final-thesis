require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const moongose = require("mongoose");
const verifyJWT = require("./middleware/verifyJWT");
const PORT = 4000;

// Connect to mongo
connectDB();

// Cross origin resource sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built in middleware for json
app.use(express.json());

// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));

app.use(verifyJWT);
app.use("/students", require("./routes/api/students"));

// Error handler
app.get("/*", (req, res) => {
  res.status(400).sendFile(path.join(__dirname, "views", "404.html"));
});

moongose.connection.once("open", () => {
  console.log("Connected to DB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
