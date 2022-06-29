import User from "../model/User";
import bcrypt from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'

const JWT_SECRET_KEY = "MyKey"


export const getUser =async(req, res, next)=>{
  let users;
  try{
    users = await User.find();
  } catch (err){
    console.log(err);
  }
  if(!users){
     return res.status(404).json({ message: "User not Found" });
   }
   return res.status(200).json({ users });
}


export const signup = async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    password,
    address1,
    address2,
    address3,
    phone,
    age,
  } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }

  if (existingUser) {
    return res.status(400).json({ message: "User already Exist" });
  }

  const hashedPassword = bcrypt.hashSync(password);

  const generateToken = (user) =>{
    return jsonwebtoken.sign({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      address1,
      address2,
      address3,
      phone,
      age,
    }, process.env.JWT_SECRET_KEY, {
      expiresIn: '30d',
    })
  }
  const user = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    address1,
    address2,
    address3,
    phone,
    age,
    token:generateToken(existingUser),
    UserProducts:[]
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }

  return res.status(201).json({ message: user });
};

// ***********  Login *************


export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return new Error(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "USer not found. Signup Please" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid Email / Password" });
  }

  const token = jsonwebtoken.sign({ id: existingUser._id }, JWT_SECRET_KEY, {
    expiresIn: '30d',
  });

  if(req.cookies[`${existingUser._id}`]){
    req.cookies[`${existingUser._id}`] = ""
  }
  console.log("Regenrated Token\n", token);

  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 30),
    httpOnly: true,
    sameSite: 'lax',
  });
  return res
    .status(200)
    .json({ message: "Successfully Logged In", user: existingUser});
};

// export const verifyToken = (req, res, next) => {
//   const cookies = req.headers.cookie;
//   const token = cookies.split("=")[1];
//   console.log(token);
//   if (!token) {
//     res.status(404).json({ message: "No token found" });
//   }
//   jwt.verify(String(token), JWT_SECRET_KEY, (err, user) => {
//     if (err) {
//       res.status(400).json({ message: "Invalid Token" });
//     }
//     console.log(user.id);
//     req.id = user.id;
//    });
//   next();
// };

// export const getUser = async (req, res, next) => {
//   const userId = req.id;
//   let user;
//   try {
//     user = await User.findById(userId, "-password");
//   } catch (err) {
//     return new Error(err);
//   }
//   if (!user) {
//     return res.status(404).json({ message: "User not Found" });
//   }
//   return res.status(200).json({ user });
// };

// export const refreshToken = (req, res, next) => {
//   const cookies = req.headers.cookie
//   const prevToken = cookies.split("=")[1];
//   console.log("Refresh Token:",prevToken);
//   if (!prevToken) {
//     return res.status(400).json({ message: "Couldn't find Token" });
//   }
//   jwt.verify(String(prevToken), JWT_SECRET_KEY, (err, user) => {
//     if (err) {
//       console.log(err);
//       return res.status(403).json({ message: "Authentication Failed" });
//     }

//     res.clearCookie(`${user.id}`);
//     req.cookies[`${user.id}`] = "";

//     const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
//       expiresIn: "1hr",
//     });
//     console.log("Regenerated Token\n", token);
//     res.cookie(String(user.id), token, {
//       path: "/",
//       expires: new Date(Date.now() + 1000 * 30),
//       httpOnly: true,
//       sameSite: "lax",
//     });

//     req.id = user.id;
//     next();
//   });
// };

export const logout = (req, res, next) =>{
  const cookies = req.headers.cookie;
  const prevToken = cookies.split('=')[1];
  if(!prevToken){
    return res.status(400).json({message: "Couldn't find token"});
  }
  jwt.verify(String(prevToken), JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication Failed" });
    }

    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";
    return res.status(200).json({ message: "Successfull Logout" });
  });
}

// export default (signup,
//   login,
//   verifyToken,
//   getUser,
//   refreshToken,
//   logout)








