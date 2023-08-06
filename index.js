const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose =require('mongoose');
const jwt =require('jsonwebtoken');
const app = express();
const router =require('./routes')
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://root:kV1ZYKuCLXcEXtot@cluster0.p8yej.mongodb.net/').then(()=>{
    console.log('Connected Succesfully');
})

app.use(express.urlencoded({extended:false}))

app.get("/ping", (_req, res, next) => {
    console.log("hello /ping");
    res.send("production test server runnging !!");
});

app.use("/api", router);


const port = process.env.PORT ? process.env.PORT : 8080;
app.listen(port, () => {
    console.log(`Server running on ${port}...`);
    console.log(process.env.PORT);
});
