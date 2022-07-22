import jwt, { decode } from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "30d",
    }
  );
};
export const generateSellerToken = (seller) => {
  return jwt.sign(
    {
      _id: seller._id,
      email: seller.email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "30d",
    }
  );
};


export const isAuth = (req, res, next) =>{
  const authorization = req.headers.authorization;
  if(authorization){
    const token = authorization.slice(7, authorization.length);
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      (err, decode)=>{
        if(err){
          res.status(401).send({message: 'Invalid Token'});
        }else{
          req.user = decode;
          next();
        }
      }
    );
  } else{
    res.status(401).send({message: 'No Token'});
  }
}