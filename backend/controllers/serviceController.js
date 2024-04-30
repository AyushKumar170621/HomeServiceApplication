const Service = require("../models/serviceModal");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

exports.createService = catchAsyncErrors(async (req, res, next) => {
    let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLinks;
  req.body.user = req.user.id;

const service = await Service.create(req.body);

res.status(201).json({
  success: true,
  service,
});
});

// get all products
exports.getAllServices = catchAsyncErrors(async (req, res) => {
    const resultPerPage = 3;
    const productsCount = await Service.countDocuments();
    const apiFeatures = new ApiFeatures(Service.find(), req.query)
      .search()
      .filter();
    let services = await apiFeatures.query;
    let filteredServicesCount = services.length;
    apiFeatures.pagination(resultPerPage);
    services = await apiFeatures.query.clone();
    res.status(200).json({
      sucess: true,
      services,
      productsCount,
      resultPerPage,
      filteredServicesCount,
    });
  });


  //get detials of single service by its id
  exports.getServiceDetails = catchAsyncErrors(async (req, res, next) => {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return next(new ErrorHandler("Product Not Found", 404));
    }
    res.status(200).json({
      success: true,
      service,
    });
  });

// Get All Product (Admin)
exports.getAdminService = catchAsyncErrors(async (req, res, next) => {
  const services = await Service.find();

  res.status(200).json({
    success: true,
    services,
  });
});

//update product - Admin
exports.updateService = catchAsyncErrors(async (req, res, next) => {
  let service = Service.findById(req.params.id);
  if (!service) {
    return next(new ErrorHandler("Service Not Found", 404));
  }
  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  if (images !== undefined && images.public_id !== "sample") {
    // Deleting Images From Cloudinary
    for (let i = 0; i < service.images.length; i++) {
      await cloudinary.v2.uploader.destroy(service.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    service,
  });
});

exports.deleteService = catchAsyncErrors(async (req, res, next) => {
  let service = await Service.findById(req.params.id);
  if (!service) {
    return next(new ErrorHandler("Service Not Found", 404));
  }
  // Deleting Images From Cloudinary
    for (let i = 0; i < service.images.length; i++) {
      await cloudinary.v2.uploader.destroy(service.images[i].public_id);
    }
  service = await Service.findByIdAndRemove(req.params.id);
  res.status(200).json({
    success: true,
    message: "Service deleted sucessfully",
  });
});


//create new Review or update the review
exports.createServiceReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, serviceId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const service= await Service.findById(serviceId);
  const isReviewed = service.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    service.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    service.reviews.push(review);
    service.numOfReviews = service.reviews.length;
  }

  let avg = 0;
  service.reviews.forEach((rev) => {
    avg += Number(rev.rating);
  });
  service.ratings = avg / service.reviews.length;

  await service.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});


//get all review of single service
exports.getServiceReviews = catchAsyncErrors(async (req, res, next) => {
  const service = await Service.findById(req.query.id);
  if (!service) {
    return next(new ErrorHandler("Service not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: service.reviews,
  });
});


//delete review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const service = await Service.findById(req.query.serviceId);

  if (!service) {
    return next(new ErrorHandler("Service not found", 404));
  }

  const reviews = service.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  let avg = 0;
  service.reviews.forEach((rev) => {
    avg += Number(rev.rating);
  });
  const ratings = avg / reviews.length;
  const numOfReviews = reviews.length;

  await Service.findByIdAndUpdate(
    req.query.serviceId,
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
