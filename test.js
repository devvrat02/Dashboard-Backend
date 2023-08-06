const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "*",
        credentials: true
    })
);
app.use(cookieParser());


const db = require("./config/index");
db.sync();

app.get("/ping", (_req, res, next) => {
    console.log("hello");
    res.send("pong");
});

app.get("/webhook", (_req, res, next) => {
    console.log("get webhook ", _req);
    res.send("pong");
});


app.post("/webhook", (_req, res, next) => {
    console.log("get webhook ", _req);
    res.send("pong");
});


const port = process.env.PORT ? process.env.PORT : 5000;
app.listen(port, () => {
    console.log(`Server running on ${port}...`);
});
