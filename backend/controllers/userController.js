const User = require('../models/userModals');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");
const axios = require("axios");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");

//Register user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    console.log(req.body);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
  
    const { name, email, password,phone,city } = req.body;
  
    const user = await User.create({
      name,
      email,
      password,
      phone,
      city,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
  
    sendToken(user, 201, res);
  });

//Register user
exports.registerProvier = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password,phone,category,city } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    phone,
    category,
    city,
    role:"provider",
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});

//get all user (admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
  
    res.status(200).json({
      success: true,
      users,
    });
  });

  //Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    //checking if both available
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return next(new ErrorHandler("Invalid Email or password", 401));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    sendToken(user, 200, res);
  });
  
  
  //logout user
  
  exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  });


//get user details

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

//get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(
        `User does not exist with given id:${req.params.id}`,
        400
      )
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//update User Role --admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

//Delete a User --admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  //we will remove cloudinary later

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }
  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);
  
  await User.findByIdAndRemove(req.params.id);
  res.status(200).json({
    success: true,
  });
});

//update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});


//update user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

//forget password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  // const resetPasswordUrl = `${req.protocol}://${req.get(   
  //   "host"
  // )}/password/reset/${resetToken}`;
  const resetPasswordUrl = `${req.protocol}://localhost:3000/password/reset/${resetToken}`;

  const message = `Your password reset token is :-  \n\n ${resetPasswordUrl}  \n\nIf you have not requested this mail then,
     please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `User Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} sucessfully`,
    });
  } catch (error) {
    user.getResetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = async (req, res, next) => {
  console.log(req.params.token);
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not matched", 400));
  }

  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
};


//create new Review or update the review
exports.createProviderReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, providerId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  let result;
  try {
    const response = await axios.post("http://127.0.0.1:5000/sentiscore", { review: comment });
    result = response.data.reply;
  } catch (error) {
    console.error("Error during axios request:", error);
    return next(new Error("Failed to analyze sentiment"));
  }

  const provider= await User.findById(providerId);
  const isReviewed = provider.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    provider.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
      if(rev.isPos && result == "Negative")
        {
          rev.isPos = false;
          provider.posCount -=1;
        }
      else if(!rev.isPos && result == "Positive")
        {
          rev.isPos = true;
          provider.posCount +=1;
        }
    });
  } else {
    if(result == "Positive")
      {
        provider.posCount+=1;
        review.isPos=true;
      }
    provider.reviews.push(review);
    provider.numOfReviews = provider.reviews.length;
  }

  let avg = 0;
  provider.reviews.forEach((rev) => {
    avg += Number(rev.rating);
  });
  provider.rating = avg / provider.reviews.length;

  await provider.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//get all review of single provider
exports.getProviderReviews = catchAsyncErrors(async (req, res, next) => {
  const provider = await User.findById(req.query.id);
  if (!provider) {
    return next(new ErrorHandler("Provider not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: provider.reviews,
  });
});

//delete review
exports.deleteProviderReview = catchAsyncErrors(async (req, res, next) => {
  const provider = await User.findById(req.query.providerId);

  if (!provider) {
    return next(new ErrorHandler("User not found", 404));
  }

  const reviews = provider.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  let avg = 0;
  provider.reviews.forEach((rev) => {
    avg += Number(rev.rating);
  });
  const ratings = avg / reviews.length;
  const numOfReviews = reviews.length;

  await User.findByIdAndUpdate(
    req.query.providerId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
  });
});