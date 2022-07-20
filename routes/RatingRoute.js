import express from "express";
import expressAsyncHandler from "express-async-handler";
import Rating from "../model/Rating";
import { isAuth } from "../utils";

const ratingRouter = express.Router();

ratingRouter.post(
  "/addrating",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newReating = new Rating({
      productRating: req.body.productRating._id,
      user: req.user._id,
      rating: req.body.rating,
      comment: req.body.comment,
    });
    const ratingComments = newReating.save();
    res
      .status(201)
      .send({ mesage: "Rating and Comment Added Successfull", ratingComments });
  })
);

ratingRouter.get(
  "/getrating",
  expressAsyncHandler(async (req, res) => {
    const getRatingView = await Rating.find();
  res.send(getRatingView);
  })
);

export default ratingRouter;
