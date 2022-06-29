import express from "express";
import {
  addAllUserProduct,
  deleteProducts,
  getAllUserProduct,
  getByUserId,
  updateProducts,
} from "../controllers/userProducts-controll";

const productRouter = express.Router();

productRouter.get("/", getAllUserProduct);
productRouter.post("/add", addAllUserProduct);
productRouter.put("/update/:id", updateProducts);
productRouter.delete("/:id", deleteProducts);
productRouter.get("/user/:id", getByUserId);

export default productRouter;
