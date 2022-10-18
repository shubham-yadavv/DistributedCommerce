const express = require('express');
const {PORT} = require('./config');
const connection = require('./database/connection')

const StartServer = async () => {
    const app = express();

    app.use(express.json());

    await connection();

    app.use('/', (req,res,next) => {

        return res.status(200).json({"msg": "Hello from products"})
    })

    app.listen(PORT, () => {
        console.log('Products is Listening to Port 8002')
    })

}

StartServer();