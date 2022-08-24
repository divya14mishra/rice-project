const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config({ path: './envfile/.env' })
const fs = require("fs");
require('../backend/models/userData');
require('../backend/models/imageMetaData');


const app = express();
// app.use(cors());
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
app.use(cors(corsOptions))
app.use(bodyParser.json());


mongoose.connect(
  process.env.DB_CONNECT_SERVER,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err);
    else console.log("Mongo Connected");
  }
);


app.get("/", async (req, res) => {
  return res.json({ status: 1 });
});

app.use("/", require("./routes/user_all_data"));
app.use("/", require("./routes/imagedata"));
app.use("/", require("./routes/imageUpload"));


app.listen(3000, ()=>{
  console.log("Server running at http://localhost:3000/");
});

