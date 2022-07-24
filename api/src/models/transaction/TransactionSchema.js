import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      require: true,
    },
  },
  { timeStamps: true }
);
export default mongoose.model("Transaction", transactionSchema);
