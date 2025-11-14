const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ status: "error", message: "Not authenticated" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      status: "error",
      message:
        "Access Denied: You must be an administrator to perform this action",
    });
  }

  next();
};

module.exports = adminOnly;
