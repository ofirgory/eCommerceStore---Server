const express = require("express");
const cors = require("cors");

const db = require("./config/db");
// const customersRouter = require("./routers/customersRouter");
const productsRouter = require("./Routes/productsRouter");

const app = express();
const port = 8000;

db.connectDB();

app.use(cors());

app.use(express.json());

// routers
// app.use("/customers", customersRouter);
app.use("/products", productsRouter);

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
