const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const authRouter = require("./routes/authRouter");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

const port = process.env.PORT || 3000;

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/product", productRoutes);
app.use("/api/users", userRoutes);

const start = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("Database Connected");

  try {
    app.listen(port, () => {
      console.log(`server running on PORT ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
// x1BGrvUbP1QagIY9   onyekwelibestephanie_db_user
