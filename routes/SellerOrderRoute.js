import express from "express";
import expressAsyncHandler from "express-async-handler";
import SellerOrder from "../model/SellerOrder";
import { isAuth } from "../utils";

const sellerOrderRouter = express.Router();
sellerOrderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new SellerOrder({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemPrice: req.body.itemPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
    });
    const order = await newOrder.save();
    res.status(201).send({ message: "New Order Created", order });
  })
);

sellerOrderRouter.get(
    "/mine",
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const orders = await Order.find({user: req.user._id});
        res.send(orders);
    })
  );