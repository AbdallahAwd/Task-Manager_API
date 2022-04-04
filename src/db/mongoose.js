const mongoose = require("mongoose");
// const url =
// "mongodb+srv://abdallah:ab3122001@cluster0.lxca3.mongodb.net/TaskManager?retryWrites=true&w=majority";
const url = process.env.MONGODB_URL;
mongoose.connect(url, {
  useNewUrlParser: true,
});
