import mongoose from "mongoose";
import User from "../model/User";
import UserProduct from "../model/UserProduct";

export const getAllUserProduct = async (req, res, next) => {
  let UserProducts;
  try {
    UserProducts = await UserProduct.find().populate('user');
  } catch (err) {
    return console.log(err);
  }
  if (!UserProducts) {
    return res.status(404).json({ message: "No Products Found" });
  }
  return res.status(200).json({ UserProducts });
};

export const addAllUserProduct = async (req, res, next) => {
  const {
    itemCategory,
    itemName,
    itemPrice,
    itemQty,
    itemUnit,
    itemDescription,
    image,
    user,
  } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "Unable To find User By This Id" });
  }
  const userProducts = new UserProduct({
    itemCategory,
    itemName,
    itemPrice,
    itemQty,
    itemUnit,
    itemDescription,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await userProducts.save({session});
    existingUser.UserProducts.push(userProducts)
    await existingUser.save({session})
    await session.commitTransaction()
  } catch (err) {
    return console.log(err);
    return res.status(500).json({message:err});
  }
  return res.status(200).json({ userProducts });
};

export const updateProducts = async (req, res, next) => {
  const {
      itemCategory,
      itemName,
      itemPrice,
      itemQty,
      itemUnit,
      itemDescription,
      image,
    } = req.body;
const productId = req.params.id;
let products;
try {
  products = await Products.findByIdAndUpdate(productId, {
    itemCategory,
    itemName,
    itemPrice,
    itemQty,
    itemUnit,
    itemDescription,
    image,
  });
} catch (err) {
  return console.log(err);
}
if (!products) {
  return res.status(500).json({ message: "Unable Update The Products" });
}
return res.status(200).json({ products });
};

export const getByUserId = async (req, res, next) => {
const id = req.params.id;
let products;
try {
  products = await User.findById(id).populate("UserProducts");
} catch (err) {
  return console.log(err);
}
if (!products) {
  return res.status(404).json({ message: "No Products Found" });
}
return res.status(200).json({UserProducts: products });
};


export const deleteProducts = async (req, res, next) => {
  const id = req.params.id;
  let products;
  try {
    products = await UserProduct.findByIdAndRemove(id).populate('user');
    await products.user.UserProducts.pull(products)
    await products.user.save();
  } catch (err) {
    return console.log(err);
  }
  if (!products) {
    return res.status(404).json({ message: "Product not Deleted" });
  }
  return res.status(200).json({ message: "Product Deleted Successfully" });
};