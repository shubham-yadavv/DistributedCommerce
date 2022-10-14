const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

const connectDB = require("./database/connect");
connectDB();

app.get('/api', (req, res)=>{
    res.send("home page")
})

app.all("*", (req, res)=>{
    res.status(404).send("page not found")
})


const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
