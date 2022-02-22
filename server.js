const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config()
const app = express();


app.use('/', serveStatic(path.join(__dirname, '/dist')));

app.get('/.*/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/dist/index.html'));
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server started");
})