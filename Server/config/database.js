const mongoose = require("mongoose");

exports.connect = () => {
  mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection failed");
    console.error(error);
    process.exit(1);
  });
};