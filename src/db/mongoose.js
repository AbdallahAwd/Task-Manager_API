const mongoose = require("mongoose");
const url =
  "mongodb+srv://abdallah:ab3122001@cluster0.lxca3.mongodb.net/TaskManager?retryWrites=true&w=majority";

mongoose.connect(url, {
  useNewUrlParser: true,
});
