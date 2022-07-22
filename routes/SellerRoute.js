import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import { generateSellerToken } from "../utils";
import Seller from "../model/Seller";

const SellerRoute = express.Router();

SellerRoute.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const sellerUser = await Seller.findOne({ email: req.body.email });
    if (sellerUser) {
      if (bcrypt.compareSync(req.body.password, sellerUser.password)) {
        res.send({
          _id: sellerUser._id,
          firstname: sellerUser.firstname,
          lastname: sellerUser.lastname,
          mnfName: sellerUser.mnfName,
          address1: sellerUser.address1,
          address2: sellerUser.address2,
          address3: sellerUser.address3,
          Mobile: sellerUser.Mobile,
          Age: sellerUser.Age,
          email: sellerUser.email,
          GSTIN: sellerUser.GSTIN,
          PAN_NO: sellerUser.PAN_NO,
          token: generateSellerToken(sellerUser),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

SellerRoute.get(
  "/sellerlogin",
  expressAsyncHandler(async (req, res, next) => {
    let sellers;
    try {
      sellers = await Seller.find();
    } catch (err) {
      console.log(err);
    }
    if (!sellers) {
      return res.status(404).json({ message: "Seller not Found" });
    }
    return res.status(200).json({ sellers });
  })
);

SellerRoute.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const newSeller = new Seller({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      mnfName: req.body.mnfName,
      email: req.body.email,
      address1: req.body.address1,
      address2: req.body.address2,
      address3: req.body.address3,
      Mobile: req.body.Mobile,
      Age: req.body.Age,
      GSTIN: req.body.GSTIN,
      PAN_NO: req.body.PAN_NO,
      password: bcrypt.hashSync(req.body.password),
    });
    const sellerUser = await newSeller.save();
    res.send({
      _id: sellerUser._id,
      firstname: sellerUser.firstname,
      lastname: sellerUser.lastname,
      mnfName: sellerUser.mnfName,
      email: sellerUser.email,
      address1: sellerUser.address1,
      address2: sellerUser.address2,
      address3: sellerUser.address3,
      Mobile: sellerUser.Mobile,
      Age: sellerUser.Age,
      GSTIN: sellerUser.GSTIN,
      PAN_NO: sellerUser.PAN_NO,
      token: generateSellerToken(sellerUser),
    });
  })
);

export default SellerRoute;
