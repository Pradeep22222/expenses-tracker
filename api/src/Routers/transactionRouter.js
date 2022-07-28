import express from "express";
const router = express.Router();
import {
  addTransaction,
  getTransactions,
  deleteTransaction,
} from "../models/transaction/TransactionModel.js";
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
    const { authorization } = req.headers;
    console.log(authorization);
    const filter = {
      userId: authorization,
    };
    console.log(authorization);
    const trans = (await getTransactions(filter)) || [];
    console.log(trans);
    res.json({
      status: "success",
      message: "here are the transactions",
      trans,
    });
  } catch (error) {
    next(error);
  }
});
router.delete("/:_id", async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { _id } = req.params;
    if (authorization && _id) {
      const filter = {
        userId: authorization,
        _id,
      };
      const result = await deleteTransaction(filter);

      if (result._id) {
        return res.json({
          status: "success",
          message: "the transaction is deleted",
        });
      }
    }

    res.json({
      status: "error",
      message: "Unable to deleted",
    });
  } catch (error) {
    next(error);
  }
});
export default router;
