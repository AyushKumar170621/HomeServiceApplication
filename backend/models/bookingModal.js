const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    locationInfo : {
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true,
        },
        pincode:{
            type:Number,
            required:true,
        },
        phoneNo:{
            type:Number,
            required:true
        }
    },
    serviceItems:{
            name:{
                type:String,
                required:true
            },
            description:{
                type:String,
                required:true
            },
            subservice:{
                type:String,
                required:true,
            },
            price:{
                type:Number,
                required:true
            },
            image:
                {
                    type:String,
                    required:true
                }
            ,
            category:{
                type:String,
                required:true,
            },
            service:{
                type:mongoose.Schema.ObjectId,
                ref:"Service",
                required:true,
            }
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    paymentInfo:{
        id:{
            type:String,
            required:true,
        },
        status:{
            type:String,
            required:true,
        },  
    },
    paidAt:{
        type:Date,
        required:true
    },
    servicePrice:{
        type:Number,
        default:0
    },
    taxPrice:{
        type:Number,
        default:0
    },
    totalPrice:{
        type:Number,
        default:0
    },
    bookingStatus:{
        type:String,
        required:true,
        default:"Processing",
    },
    serviceDate:{
        type:Date,
        required:true,
        default:Date.now,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    onetimepassword:Number,
    otpExpire:Date,
});
bookingSchema.methods.setonetimepassword = function(){
    const otp=Math.floor(1000 + Math.random() * 9000);
    this.onetimepassword=otp;
    this.otpExpire=Date.now()+20*60*1000;
    return otp;
} 
module.exports = mongoose.model("Booking",bookingSchema);