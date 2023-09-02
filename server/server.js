const express = require("express");
const cors = require("cors");
const path = require("path");
const mongodb = require("./config/authdb");
require("dotenv").config();
const app = express();
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

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`serve listening port no ${port}`);
});
