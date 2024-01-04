const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userRouter = require("./api/routes/user");
const todoRouter = require("./api/routes/todo");
const cors = require("cors");

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["https://todo-app-api-one.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ Message: "Connected" });
});

app.use("/user", userRouter);
app.use("/todo", todoRouter);

module.exports = app