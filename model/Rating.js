import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  productRating: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Rating", ratingSchema);
