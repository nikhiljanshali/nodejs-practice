import { loginUser_Service, registerUser_Service } from "../services/authServices.js";

const signup = async (req, res) => {
  try {
    const result = await registerUser_Service(req.body);
    res.status(201).json({ message: "User registered successfully", status: true, data: result });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

const login = async (req, res) => {
  try {
    const result = await loginUser_Service(req.body);
    res.json({ message: "Login successful", status: true, data: result });
  } catch (error) {
    res.status(401).json({ message: error.message, status: false });
  }
};

export { signup, login };