import mongoose from "mongoose";

const Schema = mongoose.Schema

const orderSchema = new Schema({
    orderItems:[
        {
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
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        }
    },
],
shippingAddress:{
    firstname:{
            type: String,
            required: true,
        },
        lastname:{
            type: String,
            required: true,
        },
        address1:{
            type: String,
            required: true,
        },
        address2:{
            type: String,
            required: true,
        },
        address3:{
            type: String,
            required: true,
        },
        phone:{
            type: String,
            required: true,
        },
    },
    paymentMethod: {type: String, required: true},
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
    itemPrice: {type: Number, required: true},
    shippingPrice: {type: Number, required: true},
    taxPrice: {type: Number, required: true},
    totalPrice: {type: Number, required: true},
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
    },
    isPaid: {type: Boolean, default:false},
    paidAt: {type: Date},
    isDelivered: {type: Boolean, default: false},
    deliveredAt: {type: Date},
},
{
    timestamps: true,
})

export default mongoose.model("Order", orderSchema);