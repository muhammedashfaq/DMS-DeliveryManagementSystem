const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const userController = require('./controller/userController');


// const {Server} =require ('socket.io')

const mongodb = require("./config/authdb");
require("dotenv").config();



const app = express();
const server = http.createServer(app); 
mongodb.mongoDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));



const adminroute = require("./routes/adminRoutes");
app.use("/admin", adminroute);
const driverroute = require("./routes/driverRoutes");
app.use("/hub", driverroute);
const userroute = require("./routes/userRoutes");
app.use("/", userroute);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connect", (socket) => {
//   console.log("User connected:");
//     socket.emit('join-room', trackid);
//   socket.on('join-room', (data) => {
//     socket.join(data);
//     console.log(`user with id :${socket.id} joined room:${data}`);
//   });


//   socket.on("send_message", async (data) => {
//     io.to(data.room).emit("receive_message", data);
//     const { room, author, message } = data;
//     console.log("here for chat ", data);
//     await userController.chatHistory(room, message, author);
//   });
// });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`serve listening port no ${port}`);
});
