import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    next(error);
  }
};
export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
    .cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 30),
    })
    .status(200)
    .json({...rest, token});
  } catch (error) {
    next(error);
  }
};
export const logOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User logged out!");
  } catch (error) {
    next(error);
  }
};
