require("../src/db/mongoose");
const User = require("../src/models/user");
const Task = require("../src/models/task");

// User.findByIdAndUpdate("62449a112932dd9d12db0d20", { age: 20 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 20 });
//   })
//   .then((userAge) => {
//     console.log(userAge);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// Task.findByIdAndDelete("6245c1a9e55b0b17b40b9be6",)
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((completed) => {
//     console.log(completed);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

//Async await
const deleteTaskAndCount = async (id, completed) => {
  const findTask = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: completed });
  return {
    findTask,
    count,
  };
};

deleteTaskAndCount("6246e028e555dec6839d836e", false)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
