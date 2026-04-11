import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../model/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "ShreeHari#486248";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

const registerUser_Service = async ({ firstName, lastName, email, password }) => {
  if (!firstName || !lastName || !email || !password) {
    throw new Error("FirstName, LastName, email, and password are required.");
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists with this email.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new UserModel({ firstName, lastName, email, password: hashedPassword });
  const savedUser = await user.save();

  return {
    id: savedUser._id,
    firstName: savedUser.firstName,
    lastName: savedUser.lastName,
    email: savedUser.email,
  };
};

const loginUser_Service = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid email or password.");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  };
};

export { registerUser_Service, loginUser_Service };
