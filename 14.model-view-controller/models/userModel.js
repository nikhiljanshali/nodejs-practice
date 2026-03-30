const users = [
  "Nikhil",
  "Apurva",
  "Arati"
];

exports.getAllUsers = () => {
  return users;
};

exports.addUser = (user) => {
  users.push(user);
};
