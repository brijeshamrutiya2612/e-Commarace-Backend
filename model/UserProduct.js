import mongoose from "mongoose";

const Schema = mongoose.Schema

const productSchema = new Schema({
    itemCategory:{
        type: String,
        required: true,
    },
    itemName:{
        type: String,
        required: true,
    },
    itemPrice:{
        type: Number,
        required: true,
    },
    itemQty:{
        type: Number,
        required: true,
    },
    itemUnit:{  
        type: String,
        required: true,
    },
    itemDescription:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    }
})

export default mongoose.model("UserProducts", productSchema);