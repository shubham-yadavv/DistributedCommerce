const express = require('express');
const cors  = require('cors');
const { customer } = require('./api');
const { CreateChannel, SubscribeMessage } = require('./utils')

module.exports = async (app,channel) => {

    app.use(express.json());
    app.use(cors());

    //api
    // appEvents(app);


    
    customer(app, channel);
    // error handling
    
}
