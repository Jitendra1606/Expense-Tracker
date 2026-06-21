const User = require("../models/User");

const jwt = require("jsonwebtoken");

//Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//Register user
exports.registerUser = async (req, res) => {
  const { fullname, email, password, profileImageUrl } = req.body || {};

  //Validation: check for missing fields
  if (!fullname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    //check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    //Create the user
    const user = await User.create({
      fullname,
      email,
      password,
      profileImageUrl,
    });
    res.status(201).json({
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error registering user",
      error: err.message,
    });
  }
};

//Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    res.status(200).json({
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error logging in user",
      error: err.message,
    });
  }
};

//Get user info
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching user information",
      error: err.message,
    });
  }
};
