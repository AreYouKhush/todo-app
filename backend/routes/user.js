const { Router } = require("express");
const { User, Todo } = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/Auth");
const router = Router();

router.get("/auth", authMiddleware, (req, res) => {
  res.send({ msg: "Success" });
});

router.post("/signup", async (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  const findUser = await User.findOne({ username: username });
  if (findUser) {
    res.send({ msg: "User already exists" });
  } else {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      username: username,
      password: hashPassword,
    });
    await newUser.save();
    res.send({ msg: "Success" });
  }
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const findUser = await User.findOne({ username: username });
  if (findUser) {
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (isMatch) {
      const token = jwt.sign({ username }, "SomeSecret");
      const todos = await Todo.find({ username: username });
      res.send({ token: token, todos: todos });
    } else {
      res.send({ msg: "Incorrect Password" });
    }
  } else {
    res.send({ msg: "User Does not exist" });
  }
});

module.exports = router;
