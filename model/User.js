import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // validate(value){
      //     if(!validator.isEmail(value)){
      //         throw new Error('Email is Invalid')
      //     }
      // }
    },
    password: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: true,
    },
    address3: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 10,
    },
    age: {
      type: Number,
      required: true,
      max: 100,
    },
    isAdmin:{
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
