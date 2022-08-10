import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("User", userSchema);
