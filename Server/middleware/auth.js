const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const catchAsyncErrors=require('../middleware/catchAsyncError')
const { ErrorHandler }=require('../middleware/error-middleware')

const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User is not authenticated.", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decoded);

  req.user = await User.findById(decoded.id);

  next();
});

 const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resource.`
        )
      );
    }
    next();
  };
};

module.exports = { isAuthenticated, isAuthorized }