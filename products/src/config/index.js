const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI || "mongodb://localhost:27017/products",
  APP_SECRET: process.env.APP_SECRET,
  BASE_URL: process.env.BASE_URL,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME ,
  MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
  CUSTOMER_SERVICE: "customer_service",
  SHOPPING_SERVICE: "shopping_service",
};
