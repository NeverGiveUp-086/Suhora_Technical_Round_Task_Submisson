const catchAsyncErrors = require("./catchAsyncErrors");
const { getDatabase, ref, get } = require("firebase/database");
const jwt = require("jsonwebtoken");

const db = getDatabase();

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  console.log("token", token);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error,
    });
  }
});
