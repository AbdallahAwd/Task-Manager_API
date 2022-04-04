const express = require("express");
const User = require("./models/user");
const Task = require("./models/task");
const app = express();
require("./db/mongoose");
const port = process.env.PORT || 3000;
app.use(express.json());
app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.statusCode = 201;
      res.send(user);
    })
    .catch((error) => {
      res.statusCode = 400;
      res.send(error);
    });
});
app.get("/users", (req, res) => {
  User.find({})
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      res.send(error);
    });
});
app.get("/users/:id", (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    })
    .catch((error) => {
      res.status(500).send("Error");
    });
});
app.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => {
      res.statusCode = 201;
      res.send(task);
    })
    .catch((error) => {
      res.statusCode = 400;
      res.send(error);
    });
});
app.get("/tasks", (req, res) => {
  Task.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});
app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  Task.findById(_id)
    .then((result) => {
      if (!result) {
        return res.send({
          error: "This Task is not Exist",
        });
      }
      res.send(result);
    })
    .catch((e) => {
      res.status(404).send(e);
    });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
