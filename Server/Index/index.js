const express = require("express");
const cors = require("cors");

const db = require("../Configs/configs");
const usersRouter = require("../Routers/userRouters/userRouters");

const app = express();
const port = 27017;

db.connectDB();

app.use(cors());

app.use(express.json());

app.use("/", usersRouter);

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
