const express = require("express");
const cors = require("cors");
const { products } = require("./api");

module.exports = async (app, channel) => {
  app.use(express.json());
  app.use(cors());

 
  products(app, channel);

};
