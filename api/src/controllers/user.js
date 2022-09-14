import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = "secretpassword";

// SIGNIN: http://localhost:5000/users/signin

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if the user already exists in the database or not
    const existingUser = await UserModal.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exists" });
    }

    // compare the password to match with login password
    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(404).json({ message: "Password doesn't match" });
    }

    const token = jwt.sign(
      {
        name: existingUser.name,
        email: existingUser.email,
      },
      secret,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ user: existingUser, token: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wroung with signin" });
    console.log(error);
  }
};

// SIGNUP: http://localhost:5000/users/signup

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // check if the user already exists in the database or not
    const existingUser = await UserModal.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash the password so that noone knows the password
    const hashPassword = await bcrypt.hash(password, 12);

    // create a new user if it doesn't exist
    const createUser = await UserModal.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashPassword,
    });

    // generate new access token
    const token = jwt.sign(
      { name: createUser.name, email: createUser.email },
      secret,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ user: createUser, token: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wroung with signup" });
    console.log(error);
  }
};

export const googleSignin = async (req, res) => {
  const { name, email, googleId, token } = req.body;

  try {
    // check if the user already exists in the database or not
    const existingUser = await UserModal.findOne({ email });

    if (existingUser) {
      const user = { _id: existingUser._id.toString(), name, email };
      return res.status(200).json({ user, token });
    }

    // create a new user if it doesn't exist
    const createUser = await UserModal.create({
      name,
      email,
      googleId,
    });
    res.status(201).json({ user: createUser, token: token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wroung with googleSignin" });
    console.log(error);
  }
};
