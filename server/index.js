const express = require("express");
const cors = require('cors');
const morgan = require("morgan");
const app = express();
const routeHandler = require("./routes");



app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req,res)=>{
    res.status(200).json({message: "API in running", success: true});
});

app.use("/api/v1", routeHandler);

module.exports = app;