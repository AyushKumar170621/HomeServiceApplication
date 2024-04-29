const express = require("express");
const {registerUser, getAllUser, loginUser, logout, getUserDetails, getSingleUser, deleteUser, updateProfile, updateUserRole, updatePassword, forgotPassword, resetPassword, registerProvier, createProviderReview, getProviderReviews, deleteProviderReview}  = require("../controllers/userController");
const {authorizedRoles,isAuthenticatedUser,notAuthorizedRoles} = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/proregister").post(registerProvier);
router.route("/admin/users").get(isAuthenticatedUser,authorizedRoles("admin"),getAllUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser,getUserDetails);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);
router.route("/provider/review").put(isAuthenticatedUser,notAuthorizedRoles("provider"),createProviderReview).delete(isAuthenticatedUser,notAuthorizedRoles("provider"),deleteProviderReview);
router.route("/provider/reviews").get(isAuthenticatedUser,authorizedRoles("provider"),getProviderReviews);
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizedRoles("admin"),getSingleUser).delete(isAuthenticatedUser,authorizedRoles("admin"),deleteUser).put(isAuthenticatedUser,authorizedRoles("admin"),updateUserRole);

module.exports = router;