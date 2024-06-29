const express = require("express");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");

const db = require("./config/db");
const productsRouter = require("./Routes/productsRouter");
const categoryRouter = require("./Routes/categoryRouter");
const cartRouter = require("./Routes/cartRouter");
const statisticsRouter = require("./Routes/StatisticsRouter");
const recommendationRouter = require("./Routes/recommendationRouter");
const userRouter = require("./Routes/userRouters");

const app = express();
const port = 8000;

db.connectDB();

app.use(cors());
app.use(express.json());

// routers
app.use("/users", userRouter);
app.use("/products", productsRouter);
app.use("/categories", categoryRouter);
app.use("/cart", cartRouter);
app.use("/statistics", statisticsRouter);
app.use("/recommendations", recommendationRouter);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.on("message", (message) => {
    console.log("Received:", message);
    // Handle messages received from clients here
  });
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

// Function to broadcast messages to all connected clients
function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Example usage of broadcasting a message
setTimeout(() => {
  broadcast({ type: "notification", message: "Server started successfully!" });
}, 3000);
