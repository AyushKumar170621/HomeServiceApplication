import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearErrors, updateService, deleteService } from "../action/serviceAction"; // Assuming you have service-related actions
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_SERVICE_RESET, DELETE_SERVICE_RESET } from "../constant/serviceConstants"; // Assuming you have service-related constants

const ServiceCard = ({ service }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading,
    error: updateError,
    isUpdated,
    error: deleteError,
    isDeleted
  } = useSelector((state) => state.service); // Assuming you have a service slice of state
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    dispatch(deleteService(service._id));
  };

  const updateServiceSubmitHandler = (e) => {
    e.preventDefault();
    handleSaveClick();
    const formData = new FormData();

    formData.set("name", name);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("price", price);

    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(updateService(service._id, formData));
  };

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      dispatch(clearErrors());
    }
    if (isDeleted) {
      dispatch({ type: DELETE_SERVICE_RESET });
      toast.success("Service Deleted Successfully", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
        onClose: () => {
          navigate("/services");
        },
      });
    }
    if (isUpdated) {
      dispatch({ type: UPDATE_SERVICE_RESET });
      toast.success("Service Updated Successfully", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
        onClose: () => {
          navigate("/services");
        },
      });
    }
  }, [dispatch, updateError, deleteError, isDeleted, isUpdated, navigate]);

  const updateServiceImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <ToastContainer />
      <form onSubmit={updateServiceSubmitHandler}>
        {isEditing ? (
          <input
            className="form-control"
            type="file"
            name="avatar"
            onChange={updateServiceImagesChange}
            accept="image/*"
            id="formFile"
          />
        ) : (
          <img
            src={service.images[0].url}
            className="card-img-top"
            alt={service.name}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">
            {isEditing ? (
              <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                className="form-control mb-2"
              />
            ) : (
              service.name
            )}
          </h5>
          <p className="card-text">
            {isEditing ? (
              <input
                type="text"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                className="form-control mb-2"
              />
            ) : (
              service.description
            )}
          </p>
          <p className="card-text">
            {isEditing ? (
              <input
                type="number"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                className="form-control mb-2"
              />
            ) : (
              `Price: ${service.price}`
            )}
          </p>
          <p className="card-text">
            {isEditing ? (
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" selected disabled>
                  Category
                </option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrician">Electrician</option>
                <option value="Carpentry">Carpentry</option>
                {/* Add other categories as needed */}
              </select>
            ) : (
              `Category: ${service.category}`
            )}
          </p>
          {isEditing ? (
            <div>
              <center>
                <button className="btn btn-success mx-2" type="submit">
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </center>
            </div>
          ) : (
            <div>
              <button
                onClick={handleUpdateClick}
                className="btn btn-primary mx-2"
              >
                Update
              </button>
              <button
                onClick={handleDeleteClick}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ServiceCard;
