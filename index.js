const express = require("express");
const app = express();
require("dotenv").config();
const AppError = require("./Error-Handling/error");
const ProductRoute = require("./Routes/ProductRoutes");
const UserRoutes = require("./Routes/userRoutes");
const ProductTypeRoute = require("./Routes/productTypesRoutes");
const { connectDB } = require("./Database/conn");
const globalerrorHandler = require("./Error-Handling/globalErrorHandler");
connectDB();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/users", UserRoutes);
app.use("/products", ProductRoute);
app.use("/productTypes", ProductTypeRoute);

app.all("*", (req, res, next) => {
  return next(
    new AppError(`this URL is NOT running on this server ${req.originalUrl}`)
  );
});
app.use(globalerrorHandler);
app.listen(3000, () => {
  console.log("server Connected");
});
