const express = require("express");
const { newBooking, getSingleBooking, myBookings, getAllBookings, updateBooking, setOTP, deleteBooking, updateBookingProvider, getAllProvidersBookings }  = require("../controllers/bookingController");
const {authorizedRoles,isAuthenticatedUser} = require("../middleware/auth");
const router = express.Router();

router.route("/booking/new").post(isAuthenticatedUser,newBooking);
router.route("/booking/:id").get(isAuthenticatedUser,getSingleBooking);
router.route("/bookings/me").get(isAuthenticatedUser,myBookings);
router.route("/admin/bookings").get(isAuthenticatedUser,authorizedRoles("admin"),getAllBookings);
router.route("/provider/bookings").get(isAuthenticatedUser,authorizedRoles("provider"),getAllProvidersBookings);
router.route("/admin/booking/:id").put(isAuthenticatedUser,authorizedRoles("admin"),updateBooking).delete(isAuthenticatedUser,authorizedRoles("admin"),deleteBooking);
router.route("/provider/update/booking/:id").get(isAuthenticatedUser,authorizedRoles("admin"),setOTP).put(isAuthenticatedUser,authorizedRoles("provider"),updateBookingProvider);
module.exports = router;