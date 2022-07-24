import TransactionSchema from "./TransactionSchema.js";
export const addTransaction = (obj) => {
  return TransactionSchema(obj).save();
};
