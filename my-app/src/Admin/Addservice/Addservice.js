import React, { Fragment, useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createService } from "../../action/serviceAction";
import { NEW_SERVICE_RESET } from "../../constant/serviceConstants";


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
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <form onSubmit={createServiceSubmitHandler} className="p-4 shadow-lg rounded bg-white">
                            <div className="mb-3">
                                <label htmlFor="serviceName" className="form-label">Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="serviceName" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="serviceCategory" className="form-label">Category</label>
                                <select 
                                    className="form-select" 
                                    id="serviceCategory" 
                                    value={category} 
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Select category</option>
                                    <option value="Massage">Massage</option>
                                    <option value="Electrician">Electrician</option>
                                    <option value="Plumber">Plumber</option>
                                    <option value="Pest control">Pest control</option>
                                    <option value="Chimney Repair">Chimney Repair</option>
                                    <option value="Microwave Repair">Microwave Repair</option>
                                    <option value="Kitchen cleaning">Kitchen cleaning</option>
                                    <option value="Shave/beard grooming">Shave/beard grooming</option>
                                    <option value="Face care">Face care</option>
                                    <option value="Hair colour">Hair colour</option>
                                    <option value="Home painting">Home painting</option>
                                    <option value="Bathroom cleaning">Bathroom cleaning</option>
                                    <option value="AC Repair Service">AC Repair Service</option>
                                    <option value="Water Purifier Repair">Water Purifier Repair</option>
                                    <option value="Carpenter">Carpenter</option>
                                    <option value="Washing Machine Repair">Washing Machine Repair</option>
                                    <option value="Laptop Repair">Laptop Repair</option>
                                    <option value="Full home cleaning">Full home cleaning</option>
                                    <option value="Refrigerator Repair">Refrigerator Repair</option>
                                    <option value="Men/kids haircut">Men/kids haircut</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="serviceImage" className="form-label">Choose an image</label>
                                <input 
                                    className="form-control" 
                                    name="avatar" 
                                    onChange={createServiceImagesChange} 
                                    accept="image/*" 
                                    type="file" 
                                    id="serviceImage" 
                                />
                                <div className="image-preview mt-3">
                                    {imagesPreview.map((img, index) => (
                                        <img 
                                            key={index} 
                                            src={img} 
                                            alt="Service Preview" 
                                            className="img-thumbnail" 
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="serviceDescription" className="form-label">Description</label>
                                <textarea 
                                    className="form-control" 
                                    id="serviceDescription" 
                                    rows="3" 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)} 
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="servicePrice" className="form-label">Price</label>
                                <div className="input-group">
                                    <span className="input-group-text">&#x20b9;</span>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        id="servicePrice" 
                                        value={price} 
                                        onChange={(e) => setPrice(e.target.value)} 
                                    />
                                </div>
                            </div>
                            <div className="d-grid">
                                <button 
                                    className="btn btn-primary" 
                                    type="submit" 
                                    disabled={loading}
                                >
                                    {loading ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default AddService;
