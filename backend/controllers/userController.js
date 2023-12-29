const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
const { getDatabase, ref, set, get } = require("firebase/database");
const sendToken = require("../utils/jwtToken");
const { encryptPassword, comparePassword } = require("../utils/encryptPassword");
const ErrorHandler = require("../utils/errorHandler");

const auth = getAuth();
const db = getDatabase();

//register User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  sendToken(user, 200, res);

  const hashedPassword = await encryptPassword(password);

  // Store user data in Firebase Realtime Database
  const userData = {
    uid: user.uid,
    name: name,
    email: user.email,
    password: hashedPassword,
    // ...
  };
  set(ref(db, "users/" + user.uid), userData);
});


//login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if(!email || !password){
    return next(new ErrorHandler("Please Enter Email and Password", 400));
  }

  // Find user data in Firebase Realtime Database
  const userRef = ref(db, "users");
  const snapshot = await get(userRef);
  const users = snapshot.val();
  const user = Object.values(users).find((user) => user.email === email);

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // Compare password with hashed password
  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  console.log("user", user);
  sendToken(user, 200, res);
});

//Logout a user
exports.logout = catchAsyncErrors(async(req,res,next)=>{
    
    res.cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })
    
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})
