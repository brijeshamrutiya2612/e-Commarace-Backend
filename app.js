import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import cors from "cors"
import prodRouter from "./routes/products-routes";
import productRouter from "./routes/userProducts-routes";
import dotenv from 'dotenv'

dotenv.config();

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(cors({ credentials: true, origin: "http://localhost:3000"} )),
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);
app.use("/api/products", prodRouter);
app.use("/api/userproducts", productRouter);
mongoose
  .connect(
    `mongodb+srv://brijesh:brijesh@cluster0.qe9bgqk.mongodb.net/eCommerse?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000);
    console.log("Database is Connected! Listening to localhost 5000");
  })
  .catch((err) => console.log(err));