const express = require('express');
const {PORT} = require('./config');

const app = express();

app.use(express.json());

app.use('/', (req,res,next) => {

    return res.status(200).json({"msg": "Hello from shopping"})
})


app.listen(PORT, () => {
    console.log('Shopping is Listening to Port 8003')
})