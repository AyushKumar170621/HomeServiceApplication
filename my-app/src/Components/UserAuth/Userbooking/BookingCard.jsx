import React, { useState} from "react";
import ProviderFeedback from "./ProviderFeedback";
const BookingCard = ({ item, status }) => {
  const [showDetails, setShowDetails] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
  }
  const handleToggle = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card mb-5 text-left bg-light" style={{ maxWidth: '700px' }}>
        <div className="row ">
          <div className="col-md-6">
            <img src={item.serviceItems.image} className="img-fluid rounded-start" alt={item.serviceItems.name} />
          </div>
          <div className="col-md-6 bg-dark ">
            <div className="card-body">
              <h5 className="card-title text-primary text-center">{item.serviceItems.name}</h5>
              <p className="card-text text-light">
                <b>Total Price:</b> ${item.totalPrice}
              </p>
              {status == "Service Completed"  && <button className="btn btn-primary mx-1" onClick={handleOpenToggle}>
                {isOpen ? "Cancel" : "Provide feedback"}
              </button>}

              <button className="btn btn-primary" onClick={handleToggle}>
                {showDetails ? "Hide Details" : "Show Details"}
              </button>
              {showDetails && (
                <div className="mt-3">
                  <p className="card-text text-light">
                    <b>Description:</b> {item.serviceItems.description}
                  </p>
                  <p className="card-text text-light">
                    <b>Subservice:</b> {item.serviceItems.subservice}
                  </p>
                  <p className="card-text text-light">
                    <b>Service Price:</b> ${item.servicePrice}
                  </p>
                  <p className="card-text text-light">
                    <b>Tax Price:</b> ${item.taxPrice}
                  </p>
                  <p className="card-text text-light">
                    <b>Category:</b> {item.serviceItems.category}
                  </p>
                  <p className="card-text text-light">
                    <b>Location:</b> {item.locationInfo.address}, {item.locationInfo.city}, {item.locationInfo.pincode}
                  </p>
                  <p className="card-text text-light">
                    <b>Phone No:</b> {item.locationInfo.phoneNo}
                  </p>
                  <p className="card-text text-light">
                    <b>Status:</b> {status}
                  </p>
                  <p className="card-text text-light">
                    <b>Service Date:</b> {new Date(item.serviceDate).toLocaleDateString()}
                  </p>
                  <p className="card-text text-light">
                    <b>Paid At:</b> {new Date(item.paidAt).toLocaleDateString()}
                  </p>
                </div>
              )}
              
              <ProviderFeedback providerId={item.provider} open={isOpen} setVar={setIsOpen}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
