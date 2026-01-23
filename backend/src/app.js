const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res)=>{
    res.send("Server is running!")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})