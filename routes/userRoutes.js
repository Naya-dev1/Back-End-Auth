const express = require("express");

const { deleteUser, getUsers } = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

const adminOnly = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/users", protect, adminOnly, getUsers);

router.delete("/:id", protect, adminOnly, deleteUser);

module.exports = router;
