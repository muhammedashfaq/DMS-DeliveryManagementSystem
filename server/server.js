const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const userController = require("./controller/userController");
const mongodb = require("./config/authdb");
require("dotenv").config();
const app = express();
const { Server } = require("socket.io");
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

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {

  socket.on("join-room", (data) => {
    socket.join(data);

    
   

    socket.on("send_message", async (data) => {
      io.to(data.room).emit("receive_message", data);
      const { room, author, message } = data;
      await userController.chatHistory(room, message, author);
    });

    socket.on("typing-started",()=>{
      socket.broadcast.emit("typing-started-from-server")
      })

      socket.on("typing-stoped",()=>{
        socket.broadcast.emit("typing-stoped-from-server")
        })
  

  });


});
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`serve listening port no ${port}`);
});
