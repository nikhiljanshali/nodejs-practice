const userModel = require("../models/userModel");

exports.getUsers = (req, res) => {
  const users = userModel.getAllUsers();
  res.render("users", { users });
};

exports.createUser = (req, res) => {
  const { name } = req.body;
  userModel.addUser({ name });
  res.redirect("/");
};
