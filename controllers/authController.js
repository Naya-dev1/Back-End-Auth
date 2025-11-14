const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body || {};

    if (!name) {
      return res.status(400).json({
        status: "error",
        message: "Name is required",
      });
    }

     if ( !email) {
      return res.status(400).json({
        status: "error",
        message: "Email is required",
      });
    }

    if ( !password) {
      return res.status(400).json({
        status: "error",
        message: "Password is required",
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ status: "error", message: "Email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcryptjs.hash(password, saltRounds);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken(user);
    const userSafe = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: { user: userSafe, token },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "error", message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials" });
    }

    const token = generateToken(user);

    const userSafe = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return res.status(200).json({
      status: "success",
      message: "Logged in",
      data: { user: userSafe, token },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

module.exports = { register, login };
