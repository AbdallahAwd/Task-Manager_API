const express = require("express");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const app = express();
require("./db/mongoose");
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRouter);

app.use(taskRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
