import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 // Assuming you have a component for service orders
import Spinner from '../Loading/Spinner';
import Adnav from './Adnav';
import Adfoot from './Adfoot';
import { updateServiceOrder, clearErrors, getServiceOrderDetails } from '../action/serviceAction'; // Assuming you have service order-related actions
import { UPDATE_SERVICE_ORDER_RESET } from '../constant/serviceConstants'; // Assuming you have service order-related constants
import { useParams, useNavigate } from 'react-router-dom';

const UpdateOrder = () => {
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.serviceOrderDetails); // Assuming you have service order details state
  const { error: updateError, isUpdated } = useSelector((state) => state.serviceOrder); // Assuming you have service order state
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(updateServiceOrder(id, { status }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
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
    if (isUpdated) {
      toast.success("Order Updated Successfully", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      dispatch({ type: UPDATE_SERVICE_ORDER_RESET });
    }
    dispatch(getServiceOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError, navigate]);

  return (
    <Fragment>
      <ToastContainer />
      {loading === undefined ? (
        <Spinner />
      ) : (
        <Fragment>
          <Adnav />
          {order && (
            <div className="panel .panel-primary border border-dark m-5 p-5">
              <div class="panel-heading text-center text-primary m-5 p-5 fs-1">ORDER</div>
              <div class="panel-body text-center">
                {order.serviceItems.map((item) => (
                  <ServiceOrdersCard key={order._id} item={item} date={order.createdAt} status={order.orderStatus} />
                ))}
                <p className='fs-4'><b>Payment Id :</b>{order.paymentInfo.id}</p>
                <p className='fs-4'><b>Payment Status :</b>{order.paymentInfo.status}</p>
                <form onSubmit={updateOrderSubmitHandler}>
                  <select onChange={(e) => setStatus(e.target.value)} style={{ width: '40%' }}>
                    <option value="">Choose Status</option>
                    {order.orderStatus === "Pending" && (
                      <option value="In Progress">In Progress</option>
                    )}
                    {order.orderStatus === "In Progress" && (
                      <option value="Completed">Completed</option>
                    )}
                  </select>
                  <button type='submit' className='btn btn-lg btn-primary m-2'>Update</button>
                </form>
              </div>
            </div>
          )}
          <Adfoot />
        </Fragment>
      )}
    </Fragment>
  );
}

export default UpdateOrder;
