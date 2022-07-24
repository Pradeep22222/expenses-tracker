import express from "express";
import { insertUser } from "../models/userModel/UserModel.js";
import { getOneUser } from "../models/userModel/UserModel.js";

const router = express.Router();
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getOneUser({ email: email });
    if (user?.password === password) {
      user.password = undefined;
      return res.json({
        status: "success",
        message: "login successfully",
        user,
      });
    }
    res.json({
      status: "error",
      message: "invalid login information",
    });
    console.log(email, password);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const result = await insertUser(req.body);
    result?._id
      ? res.json({
          status: "success",
          message:
            "Your account has been created successfully ,please check your email to confirm the account and try logging in",
        })
      : res.json({
          status: "error",
          message: "unable to register, please try again later",
        });
  } catch (error) {
    if (error.message.includes("E11000")) {
      error.status = 200;
      error.message =
        "There is another account already existing with this email";
    }
    next(error);
  }
});
export default router;
