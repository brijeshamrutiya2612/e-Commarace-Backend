import express from "express";
import {
  addProducts,
  deleteProducts,
  getAllProducts,
  getById,
  updateProducts,
} from "../controllers/products-controllers";
const prodRouter = express.Router();

prodRouter.get("/", getAllProducts);
prodRouter.post("/add", addProducts);
prodRouter.put("/update/:id", updateProducts);
prodRouter.get("/:id", getById);
prodRouter.delete("/:id", deleteProducts);

export default prodRouter;
