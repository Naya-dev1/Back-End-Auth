const express = require("express");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");

const adminOnly = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/all", getProducts);

router.post("/create", protect, adminOnly, createProduct);

router.get("/:id", getProductById);

router.patch("/:id/update", protect, adminOnly, updateProduct);

router.delete("/:id/delete", protect, adminOnly, deleteProduct);

module.exports = router;
