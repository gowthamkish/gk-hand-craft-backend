import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.json("Please enter mandatory fields");
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        hashedPassword: hashedPassword,
      });

      await newUser.save();
      return res.status(200).json({ message: "New user created successfully" });
    } catch (error) {
      console.log(error);
      return res.json({ message: "Server error - Register not success" });
    }
  }
};

export const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.json("Please enter mandatory fields");
  }

  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "name email password hashedPassword"
    );

    console.log("user", user);
    if (!user) {
      return res.status(404).json("No user found");
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.hashedPassword
    );

    if (!isPasswordCorrect) {
      return res
        .status(500)
        .send({ message: "Incorrect Password", status: 500 });
    }

    const payload = {
      id: user._id,
      name: user.name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log(token);
    return res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send({ status: 200, message: "Login success" });
  } catch (error) {
    console.log(error);
    return res.send({ message: "Server error - Login not success" });
  }
};
