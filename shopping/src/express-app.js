const express = require("express");
const cors = require("cors");
const { shopping } = require("./api");


module.exports = async (app,channel) => {
  app.use(express.json());
  app.use(cors());

  shopping(app, channel);
};
