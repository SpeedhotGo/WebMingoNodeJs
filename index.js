const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const {
    log
} = require('console');
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const PostRoute = require("./routes/post");
var cors = require('cors');
dotenv.config();
mongoose.connect(
    process.env.MONGO_URL
).then(() =>
    console.log("DBconnection Successful")
).catch((err) => {
    console.log(err);
});
app.use(express.json());
app.use(cors());
app.use(cors({
    origin: '*',
})); 
 app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Credentials", "true");
     res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Content-Length, X-Requested-With");
     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
     next();
 });
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", PostRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("backend server is running!");
})