import express from "express";
const router = express.Router();
import { addTransaction } from "../models/transaction/TransactionModel.js";
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await addTransaction(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "New transaction added",
        })
      : res.json({
          status: "error",
          message: "unable to add the transaction, try again later",
        });
  } catch (error) {
    next(error);
  }
});
router.get("/", async (req, res, next) => {
  try {
    const { authorization } = await req.headers;
    console.log(authorization);
    res.json({
      stats: "success",
      message: "todo",
    });
  } catch (error) {
    next(error);
  }
});
export default router;
