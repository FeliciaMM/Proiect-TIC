const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");

const app = express();

const express = require("express");
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send("Server is running!")
})

const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})