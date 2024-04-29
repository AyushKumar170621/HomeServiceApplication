const express = require("express");
const {createService, getAllServices, getServiceDetails, getAdminService, updateService, deleteService, createServiceReview, getServiceReviews, deleteReview} = require("../controllers/serviceController");
const {authorizedRoles,isAuthenticatedUser} = require("../middleware/auth");
const router = express.Router();

router.route("/admin/service/new").post(isAuthenticatedUser,authorizedRoles("admin"),createService);
router.route("/services").get(getAllServices);
router.route("/service/:id").get(getServiceDetails);
router.route("/admin/services").get(isAuthenticatedUser,authorizedRoles("admin"),getAdminService);
router.route("/review").put(isAuthenticatedUser,createServiceReview);
router.route("/reviews").get(isAuthenticatedUser,getServiceReviews).delete(isAuthenticatedUser,deleteReview);
router.route("/admin/services/:id").put(isAuthenticatedUser,authorizedRoles("admin"),updateService).delete(isAuthenticatedUser,authorizedRoles("admin"),deleteService);
module.exports = router;