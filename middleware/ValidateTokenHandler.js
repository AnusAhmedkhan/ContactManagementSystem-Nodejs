const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const verifyTokenMiddle = asyncHandler((req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
      if (err) {
        res.status(401);
        throw new Error("UnAuthorized USer");
      }
      req.user = decode.User;
      next();
    });
  }
  if (!token) {
    res.status(401);
    throw new Error("User not authorized and token is missing");
  }
});

module.exports = verifyTokenMiddle;
