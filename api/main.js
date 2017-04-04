"use strict";

const express = require("express");
const process = require("process");
const app = express();

app.use(express.static(__dirname.replace(/\api/g, "")));
console.log(__dirname.replace(/\api/g, ""));
//middlewares
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Content-Type', "application/json");
    next();
});

// routes
app.use("/search", require("./controllers/scraper.controller.js"));

app.listen(process.env.PORT ? process.env.PORT : 8080, () => {
    console.log("API running...");
});