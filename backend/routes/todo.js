const { Router } = require("express");
const { Todo } = require("../db/db");
const authMiddleware = require("../middlewares/Auth");
const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  try{
    const username = res.locals.data;
    const todos = await Todo.find({username: username});
    res.json(todos);
  }catch(err){
    res.send({msg: err})
  }
})

router.post("/new", authMiddleware, async (req, res) => {
  try {
    const username = res.locals.data;
    const newTodo = new Todo({
      username: username,
      title: req.body.title,
      description: req.body.description,
    });
    await newTodo.save();
    res.send({ msg: "Success" });
  } catch (err) {
    res.send({ msg: err });
  }
});

router.put("/edit/:id", authMiddleware, async (req, res) => {
  try {
    await Todo.updateOne(
      { _id: req.params.id },
      { title: req.body.title, description: req.body.description }
    );
    res.send({ msg: Success });
  } catch (err) {
    res.send({ msg: err });
  }
});

router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });
    res.send({ msg: "Deleted" });
  } catch (err) {
    res.send({ msg: err });
  }
});

module.exports = router;
