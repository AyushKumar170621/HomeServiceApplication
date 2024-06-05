import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { deleteUser,clearErrors, getUserDetails } from '../action/userAction';
import { DELETE_BOOKING_RESET } from '../constant/bookingConstants';
import 'react-toastify/dist/ReactToastify.css';
const UCard = ({user}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        error: deleteError,
        isDeleted,
        message,
      } = useSelector((state) => state.profile);
    
      const deleteUserHandler = () => {
        dispatch(deleteUser(user._id));
      };

      useEffect(() => {
    
        if (deleteError) {
            toast.error(deleteError,{
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });
            dispatch(clearErrors());
        }
            if (isDeleted) {
                dispatch({ type: DELETE_BOOKING_RESET });
                toast.success("User Deleted Successfully",{
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 3000,
                  onClose: () => {
                    navigate("/admin");
                  },
                });
                
              }
        dispatch(getUserDetails(user._id));
      }, [dispatch,  deleteError, isDeleted, message, navigate,user._id]);
    
  return (
    <div className="col justify-content-center my-5 ">
    <ToastContainer/>
    <div className="card">
        <img src={user.avatar.url} style={{height:'18rem',width: '100%',objectFit: 'contain'}} className="card-img-top" alt={user.name}/>
      <div className="card-body text-center">
      <form>
        <h5 className="card-title"><b>Name :</b> {user.name}</h5>
        <p className="card-text"><b>Email :</b> {user.email}</p>
        <p className="card-text"><b>Role :</b>{user.role}</p>
        <center>
            <Link className='btn btn-warning m-2' to={`/admin/user/${user._id}`}>Edit</Link>
            <button className='btn btn-primary m-2' onClick={deleteUserHandler}  type="submit">Delete</button>
        </center>
        </form>
      </div>
    </div>
  </div>
  )
}

export default UCard