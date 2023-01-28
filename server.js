const express = require("express"); // +
const morgan = require("morgan"); // +
const cors = require("cors"); // +

require("dotenv").config();

const noticeRouter = require("./api/noticeRouter");
const authRouter = require("./api/authRouter");
const serviceRouter = require("./api/serviceRouter");
const userRouter = require("./api/userRouter");

const { connectionDb } = require("./db");

// -----

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.json()); // +
app.use(cors()); // +
app.use(morgan(formatsLogger));
app.use(express.static("public")); // +

app.use("/api/auth", authRouter);
app.use("/api", serviceRouter);
app.use("/api/users", userRouter);
app.use("/api/notices", noticeRouter);

app.use((_, res) => {
  res.status(404).json({
    message: "Use api on routes: /api/users/, /api/contacts/",
  });
});

app.use((error, _, res) => {
  console.log(error.stack);
  res.status(500).json({
    message: error.message,
  });
});

const PORT = process.env.PORT || 3000;

const start = async () => {
  await connectionDb();

  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
};

start();
