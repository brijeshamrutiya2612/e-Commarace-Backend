import express from 'express';
import axios from 'axios';
import { getUser, login, logout, signup } from '../controllers/user-controller';


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", getUser); //verifyToken
//router.get("/refresh",  getUser); refreshToken, verifyToken,
router.post("/logout", logout); //refreshToken, 


export default router
//module.exports = router;
