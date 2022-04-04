const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = express.Router();
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");

    if (parts[1] === "desc") {
      sort.createdAt = -1;
    } else {
      sort.createdAt = 1;
    }
  }
  try {
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });
    //Another way to filtering by if statement

    // var tasks;
    // if (match.completed) {
    //   tasks = await Task.find({ completed: match.completed });
    // } else {
    //   tasks = await Task.find({ completed: match.completed });
    // }
    // if (match.completed === undefined) {
    //   tasks = await Task.find({ owner: req.user._id });
    // }
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send({ error: `Error ${error}` });
  }
});
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send({ error: "This task is not Exist" });
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.put("/tasks/:id", auth, async (req, res) => {
  const taskAllowd = ["completed", "description"];
  const update = Object.keys(req.body);
  const isAllowed = update.every((update) => {
    return taskAllowd.includes(update);
  });
  if (!isAllowed) {
    return res.send({ error: "Not Allowd Property" });
  }
  try {
    // const task = await Task.findById(req.params.id);
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    update.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();
    if (!task) {
      return res.status(400).send({ error: "invalid id" });
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    // const task = await Task.findOneAndDelete(req.params.id);
    const task = await Task.remove({ _id: req.params.id, owner: req.user._id });
    if (!task) {
      return res.status(404).send({ error: "Task Not Found" });
    }
    res.send({ info: "Task Deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
