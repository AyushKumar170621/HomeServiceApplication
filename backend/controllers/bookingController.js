const Booking = require("../models/bookingModal");
const Service = require("../models/serviceModal");
const User = require("../models/userModals");
const ErrorHandler = require("../utils/errorHandler");
const sendEmail = require("../utils/sendEmail")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//create new errors
exports.newBooking = catchAsyncErrors( async(req,res,next) =>{
    const {locationInfo,serviceItems,paymentInfo,servicePrice,taxPrice,serviceDate,totalPrice}  = req.body;
    const booking = await Booking.create({
        locationInfo,
        serviceItems,
        paymentInfo,
        servicePrice,
        taxPrice,
        totalPrice,
        paidAt:Date.now(),
        serviceDate,
        user:req.user._id,
    });

    res.status(201).json({
        success:true,
        booking,
    })
})


//get single order 

exports.getSingleBooking = catchAsyncErrors( async(req,res,next) =>{
    const booking = await Booking.findById(req.params.id).populate("user","name email");
    if(!booking)
    {
        return next(new ErrorHandler("Order Not Found",404));
    }
    res.status(200).json({
        success:true,
        booking,
    })

})

//get logged user booking 

exports.myBookings = catchAsyncErrors( async(req,res,next) =>{
    const bookings = await Booking.find({user:req.user._id});
    res.status(200).json({
        success:true,
        bookings,
    })

})

//get all booking --admin

exports.getAllBookings = catchAsyncErrors( async(req,res,next) =>{
    const booking = await Booking.find();
    let totalAmout=0;
    booking.forEach( order => {
        totalAmout+=order.totalPrice;
    })
    res.status(200).json({
        success:true,
        totalAmout,
        booking,
    });

});

//get all booking by provieder category

exports.getAllProvidersBookings = catchAsyncErrors( async(req,res,next) =>{
    const user = await User.findById(req.user.id);
    // const bookings = await Booking.find({serviceItems: {$elemMatch: {category:user.category}}});
    const bookings = await Booking.find({ 'serviceItems.category': user.category });
    res.status(200).json({
        success:true,
        bookings,
    });

});

//sendOtp
exports.setOTP = catchAsyncErrors( async (req,res,next) => {
    const booking = await Booking.findById(req.params.id);
    const otp=booking.setonetimepassword();
    await booking.save({validateBeforeSave:false});
    const user = await User.findById(booking.user);
    const message = `The one time password for your service completion is ${otp}. Please provide it to service provider to complete the service.`
    try {
        await sendEmail({
          email: user.email,
          subject: `Otp for service completion`,
          message,
        });
        res.status(200).json({
          success: true,
          message: `Email sent to ${user.email} sucessfully`,
        });
      } catch (error) {
        user.onetimepassword = undefined;
        user.otpExpire = undefined;
    
        await user.save({ validateBeforeSave: false });
    
        return next(new ErrorHandler(error.message, 500));
      }
})

//update Order status --admin

exports.updateBookingProvider = catchAsyncErrors( async (req,res,next) =>{
    const booking = await Booking.findById(req.params.id);
    const flag=false;
    if(!booking)
    {
        return next(new ErrorHandler("Booking Not Found",404));
    }
    if(booking.bookingStatus ==="Service Completed")
    {
        return next (new ErrorHandler("You have already serviced this product",404));
    }
    if(req.body.status === "Service Completed" && req.body.otp === booking.onetimepassword)
    {

        booking.bookingStatus=req.body.status;
    }
    else if(req.body.status != "Service Completed")
    {
        booking.bookingStatus=req.body.status;
    }
    else
    {
        return next (new ErrorHandler("OTP does not match",404));
    }
    await booking.save({validateBeforeSave:false});
    
    res.status(200).json({
        success:true,
    });
    

});

//delete Order --admin

exports.deleteBooking = catchAsyncErrors( async(req,res,next) =>{
    const booking = await Booking.findById(req.params.id);
    if(!booking)
    {
        return next(new ErrorHandler("Order Not Found",404));
    }
    await Booking.findByIdAndRemove(req.params.id);
    res.status(200).json({
        success:true
    });

});

//update Order status --admin

exports.updateBooking = catchAsyncErrors( async (req,res,next) =>{
    const booking = await Booking.findById(req.params.id);
    if(!booking)
    {
        return next(new ErrorHandler("Booking Not Found",404));
    }
    if(booking.bookingStatus ==="Service Completed")
    {
        return next (new ErrorHandler("You have already serviced this product",404));
    }
    else
    {
        booking.bookingStatus=req.body.status;
    }
    await booking.save({validateBeforeSave:false});
    
    res.status(200).json({
        success:true,
    });
    

});
