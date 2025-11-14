const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, inStock } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ status: "error", message: "Product name is required" });
    }

    if (!price) {
      return res
        .status(400)
        .json({ status: "error", message: "Product price is required" });
    }

    const product = await Product.create({ name, description, price, inStock });

    return res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: product,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    return res.status(200).json({ status: "success", data: products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    return res.status(200).json({ status: "success", data: product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);

    if (!product)
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    res
      .status(200)
      .json({ status: "success", message: "Product updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });

    return res
      .status(200)
      .json({ status: "success", message: "Product deleted Successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
