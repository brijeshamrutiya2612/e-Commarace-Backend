import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import { generateSellerToken } from "../utils";
import Seller from "../model/Seller";

const SellerRoute = express.Router();
SellerRoute.post(
  '/login',
  expressAsyncHandler(async (req, res)=>{
    const sellerUser = await Seller.findOne({email: req.body.email});
    if(sellerUser){
      if(bcrypt.compareSync(req.body.password, sellerUser.password)){
        res.send({
          _id: sellerUser._id,
          firstname: sellerUser.firstname,
          lastname: sellerUser.lastname,
          address1: sellerUser.address1,
          address2: sellerUser.address2,
          address3: sellerUser.address3,
          Mobile:sellerUser.Mobile,
          Age:sellerUser.Age,
          email:sellerUser.email,
          GSTIN:sellerUser.GSTIN,
          PAN_NO:sellerUser.PAN_NO,
          token:generateSellerToken(sellerUser)
        });
        return;
      }
    }
    res.status(401).send({message: "Invalid email or password"})
  })
)

SellerRoute.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const newSeller = new Seller({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      mnfName:req.body.mnfName,
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
    const seller = await newSeller.save();
    res.send({
      _id: seller._id,
      firstname: seller.firstname,
      lastname: seller.lastname,
      mnfName: seller.mnfName,
      email: seller.email,
      address1: seller.address1,
      address2: seller.address2,
      address3: seller.address3,
      Mobile: seller.Mobile,
      Age: seller.Age,
      GSTIN: seller.GSTIN,
      PAN_NO: seller.PAN_NO,
      token: generateSellerToken(seller),
    });
  })
);

export default SellerRoute;