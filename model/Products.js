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
    quantity:{
        type: Number,
        required: true,
    },
    rating:{
        type: String,
    },
    mnfName:{
        type: String,
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
},
{
    timestamps: true
}
)

export default mongoose.model("Products", productSchema);