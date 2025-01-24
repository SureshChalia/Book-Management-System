const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.body.token || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));
    const authKey = req.header("x-auth-key") || req.body.authKey;

    if (!token) {
      if (authKey && authKey === process.env.AUTH_KEY) {
        return next();
      } else {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }
    }  
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({
        error: error.message,
        success: false,
        message: "Token is invalid",
      })
    }
    next();
  }
  catch (error) {
    console.log("Error in middleware:", error.message);
    return res.status(401).json({
      success: false,
      message: "something went wrong ,while verifying the token"
    })
  }
}
