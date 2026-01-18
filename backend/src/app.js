const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");

const app = express();

const express = require("express");
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res)=>{
    res.send("Server is running!")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})