import express from "express";
import cors from "cors";
const app = express();
express.json();
const PORT = 8000;
// db connection
import { connectDB } from "./src/config/dbConfig.js";
connectDB();
// middlewares
app.use(express.json());
app.use(cors());
// APIS
import userRouter from "./src/Routers/userRouter.js";
import transactionRouter from "./src/Routers/transactionRouter.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/transaction", transactionRouter);

// Server side rendering
app.use("/", (req, res, next) => {
  try {
    res.send("<h1>Coming Soon</h1>");
  } catch (error) {
    next(error);
  }
});
app.use((error, req, res, next) => {
  const status = error.status || 404;
  res.status(status).json({
    status: "error",
    message: error.message,
  });
});
app.listen(PORT, (err) => {
  err && onsole.log(err);
  console.log(`your server is serving at http://localhost ${PORT}`);
});
