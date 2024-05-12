import React, { Fragment, useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createService } from "../action/serviceAction";
import { NEW_SERVICE_RESET } from "../constant/serviceConstants";

const AddService = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success } = useSelector((state) => state.newService);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            })
            dispatch(clearErrors());
        }

        if (success) {
            toast.success("Service Created Successfully", {
                autoClose: 2000,
                position: toast.POSITION.TOP_CENTER,
                onClose: () => {
                    dispatch({ type: NEW_SERVICE_RESET });
                    navigate("/admin");
                }
            })
        }
    }, [dispatch, error, success, navigate]);

    const createServiceSubmitHandler = async (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);

        images.forEach((image) => {
            myForm.append("images", image);
        });

        await dispatch(createService(myForm));
    };

    const createServiceImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

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
        <Fragment>
            <ToastContainer />
            
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="section-title text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ "maxWidth": "500px" }}>
                        <h1 className="display-6">Add Service</h1>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row ">
                    <div className="col-lg-12 d-flex align-items-center justify-content-center">
                        <form onSubmit={createServiceSubmitHandler}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label" >Name</label>
                                <input type="text" onChange={(e) => { setName(e.target.value) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <select className="form-select" aria-label="Default select example" onChange={(e) => { setCategory(e.target.value) }}>
                                    <option selected>Category</option>
                                    <option value="Cleaning">Cleaning</option>
                                    <option value="Maintenance">Maintenance</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Choose an image</label>
                                <input className="form-control" name="avatar" onChange={createServiceImagesChange} accept="image/*" type="file" id="formFile" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                                <textarea className="form-control" onChange={(e) => { setDescription(e.target.value) }} id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <label htmlFor="price" className="form-label">Price</label>
                            <div className="input-group mb-3">
                                <div className="input-group-text">
                                    &#x20b9;
                                </div>
                                <input type="number" onChange={(e) => { setPrice(e.target.value) }} className="form-control" aria-label="Amount (to the nearest rupee)" />
                            </div>
                            <center>
                                <button className="btn-primary btn-lg m-2" type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
                            </center>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default AddService;
