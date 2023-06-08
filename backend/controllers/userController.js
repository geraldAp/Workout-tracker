const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// so this can generate for both the login and signup
// we are passing in the id arg that
const createToken = (_id) => {
  // we call this and use a method called sign and we pass in 3 arguments first is the object which represents the payload on the token we want to create you can use anything but not anything sensitive
  // the second argument is the secret string on;y known to the server
  // the 4rd argument is options here we are using the expiresIn property basically the user is going to be logged in 3 days before the token expires
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // create a token
    // after the users have been saved to the database lets create a token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
