import express from "express";
import {
  addProducts,
  deleteProducts,
  getAllProducts,
  getById,
  updateProducts,
} from "../controllers/products-controllers";
import expressAsyncHandler from "express-async-handler";
import Products from "../model/Products.js";

const prodRouter = express.Router();

prodRouter.get("/", getAllProducts);
prodRouter.post("/add", addProducts);
// prodRouter.put("/update/:id", updateProducts);
prodRouter.get("/:id", getById);
// prodRouter.delete("/:id", deleteProducts);


const PAGE_SIZE = 3;
prodRouter.get(
  "/search",
  expressAsyncHandler(async (req, res) => {
    const {query} = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const itemCategory = query.itemCategory || "";
    const price = query.price || "";
    const rating = query.rating || "";
    const order = query.order || "";
    const searchQuery = query.query || "";

    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? {
            name: {
              $regex: searchQuery,
              $options: "i", //caseSensitive
            },
          }
        : {};

    const categoryFilter = itemCategory && itemCategory !== "all" ? { itemCategory } : {};

    const ratingFilter =
      rating && rating !== "all"
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== "all"
        ? {
            price: {
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};
    const sortOrder =
      order === "featured"
        ? { featured: -1 }
        : order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { rating: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : order === "newest"
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Products.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
      const countProducts = await Products.countDocuments({
        ...queryFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter,
      });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize)
    });
  })
);


export default prodRouter;
