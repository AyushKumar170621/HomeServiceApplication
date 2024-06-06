import React,{useEffect,useState,Fragment} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookingCard from './BookingCard';
import { updateBooking,clearBookingErrors,getBookingDetails } from '../action/bookingAction';
import { UPDATE_BOOKING_RESET } from '../constant/bookingConstants';
import { useParams,useNavigate } from 'react-router-dom'
const Updatebooking = () => {
    const {id} = useParams();
    const { booking, error, loading } = useSelector((state) => state.bookingDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.booking);
    const updateBookingSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("status", status);
    
        dispatch(updateBooking(id, myForm));
      };
      const [status, setStatus] = useState("");
      const dispatch = useDispatch();
      const navigate = useNavigate();
    useEffect(() => {
      if (error) {
        toast.error(error,{
          position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        dispatch(clearBookingErrors());
      }
      if (updateError) {
        toast.error(updateError,{
          position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        dispatch(clearBookingErrors());
      }
      if (isUpdated) {
        toast.success("Booking Updated Successfully",{
          position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        dispatch({ type: UPDATE_BOOKING_RESET });
      }
      dispatch(getBookingDetails(id));
    }, [dispatch, error, id, isUpdated, updateError,navigate]);
  return (
    <Fragment>
        <ToastContainer/>
        {loading ===undefined?(<h1>loading</h1>):(<Fragment>
        {booking && (<div  className="panel .panel-primary border border-dark m-5 p-5">
                <div class="panel-heading text-center text-primary m-5 p-5 fs-1">ORDER</div>
                <div class="panel-body text-center">
                  <BookingCard booking={booking}/>
                  <p className='fs-4'><b>Payment Id :</b>{booking.paymentInfo.id}</p>
                  <p className='fs-4'><b>Payment Status :</b>{booking.paymentInfo.status}</p>
                  <form onSubmit={updateBookingSubmitHandler}>
                  <select onChange={(e) => setStatus(e.target.value)} style={{width:'40%'}}>
                      <option value="">Choose Status</option>
                      {booking.bookingStatus === "Processing" && (
                        <option value="Booking Accepted">Booking Accepted</option>
                      )}

                      {booking.bookingStatus === "Booking Accepted" && (
                        <option value="Service Completed">Service Completed</option>
                      )}
                    </select>
                    <button type='submit' className='btn btn-lg btn-primary m-2'>Update</button>
                  </form>
                </div>
        </div>)}
    </Fragment>)}
    </Fragment>
    
  )
}

export default Updatebooking