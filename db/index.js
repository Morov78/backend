const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const { URI_DB, DB_NAME } = process.env;

mongoose.set("strictQuery", false);

const connectionDb = async () => {
  await mongoose
    .connect(URI_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: DB_NAME,
    })
    .then(() => {
      console.log("Database connection successful");
    })
    .catch((error) => {
      console.log(`Database not connection. ${error.message}`);
      process.exit(1);
    });
};

const disconnectDb = async () => {
  await mongoose.disconnect();
};

module.exports = { connectionDb, disconnectDb };
