const express = require("express");
const cors = require("cors");
const { customer } = require("./api");

module.exports = async (app, channel) => {
  app.use(express.json());
  app.use(cors());

  customer(app, channel);
};
