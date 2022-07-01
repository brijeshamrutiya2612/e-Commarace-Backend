import express from 'express';
import bcrypt from 'bcryptjs'
import expressAsyncHandler from 'express-async-handler'
import { getUser, login, logout, signup } from '../controllers/user-controller';
import User from '../model/User';
import { generateToken } from '../utils';


const router = express.Router();

router.post("/signup", signup);
router.post("/login", expressAsyncHandler(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});
    if(user){
      if(bcrypt.compareSync(req.body.password, user.password)){
        res.send({
          _id:user._id,
          firstname:user.firstname,
          email:user.email,
          token:generateToken(user)
        });
        return;
      }

    }
    res.status(401).send({message: "Invaild email or password"});
}
))
router.get("/users", getUser); //verifyToken
//router.get("/refresh",  getUser); refreshToken, verifyToken,
router.post("/logout", logout); //refreshToken, 


export default router
//module.exports = router;
