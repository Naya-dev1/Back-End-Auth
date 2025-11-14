const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (!users) {
      return res
        .status(404)
        .json({ status: "error", message: "No users found" });
    }

    return res.status(200).json({ status: "success", data: users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    return res
      .status(200)
      .json({ status: "success", message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

module.exports = { deleteUser, getUsers };
