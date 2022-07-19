import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SellerSchema = Schema({
    firstname:{
        type: String,
        require: true
    },
    lastname:{
        type: String,
        require: true
    },
    mnfName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique:true
    },
    password:{
        type: String,
        require: true
    },
    address1:{
        type: String,
        require: true
    },
    address2:{
        type: String,
        require: true
    },
    address3:{
        type: String,
        require: true
    },
    Mobile:{
        type: Number,
        unique:true,
        require: true
    },
    Age:{
        type: Number,
        require: true
    },
    GSTIN:{
        type: String,
        require: true,
        unique:true,
        max: 15
    },
    PAN_NO:{
        type: String,
        require: true,
        unique:true,
        max: 10
    },
})

export default mongoose.model("Seller", SellerSchema)