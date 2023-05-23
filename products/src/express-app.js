const express = require("express");
const cors = require("cors");
const { products, appEvents } = require("./api");

const { CreateChannel } = require("./utils");

module.exports = async (app, channel) => {
  app.use(express.json());
  app.use(cors());

  // //api
  // appEvents(app);
 
  products(app, channel);

};
