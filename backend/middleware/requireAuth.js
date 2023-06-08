// this is being done to ensure once the user is logged out the api routes are protected and data cannot be fetched
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  // the headers property has a property value authorization so we are using the headers first
  const { authorization } = req.headers;
  // if there is no value for authorization
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  // next thing is getting the token from the authorization
  // splitting cos the first property is the bearer and the second is the token so we split it then take the token since its position is one
  const token = authorization.split(" ")[1];
  //  verifying the token to make sure it has not been tampered with
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    // this just returns to us the id not the whole doc
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
