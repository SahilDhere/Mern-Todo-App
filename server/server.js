const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors')
const port = process.env.PORT || 3000;

const db = require('./config/dbConnection.js')
db();

const model = require("./models/Todo.js")
model()

const userModel = require("./models/User.js")
userModel()

app.use(cors());
app.use(express.json());  // for parsing the json data and also for apply post method
app.use("/items", require("./routes/Todo.js"))
app.use("/auth", require("./routes/User.js"))

app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})