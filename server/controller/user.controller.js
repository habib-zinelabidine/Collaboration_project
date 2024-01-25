import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, currentPassword, newPassword, confirmPassword } =
      req.body;
    const user = await User.findById(id);

    const updateFields = {
      username,
      email,
      avatar: req.file
        ? process.env.baseUrl + process.env.PORT + "/" + req.file.path
        : user.avatar,
    };
    if (
      currentPassword !== undefined ||
      newPassword !== undefined ||
      confirmPassword !== undefined
    ) {
      const isPasswordValid = bcrypt.compareSync(
        currentPassword,
        user.password
      );

      if (!isPasswordValid) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }

      if (newPassword !== undefined && newPassword.trim() !== "") {
        if (newPassword !== confirmPassword) {
          return res
            .status(400)
            .json({ error: "New password and confirm password do not match" });
        }

        const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
        updateFields.password = hashedNewPassword;
      } else {
        return res.status(400).json({ error: "No password was given!" });
      }
    } else {
      updateFields;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
