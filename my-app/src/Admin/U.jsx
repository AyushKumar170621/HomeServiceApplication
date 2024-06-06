import React,{useState,useEffect, Fragment} from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import { UPDATE_USER_RESET } from "../constant/userConstant";
import 'react-toastify/dist/ReactToastify.css';
import { updateUser,clearErrors,getUserDetails } from "../action/userAction";
const User = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const { loading, error, user } = useSelector((state) => state.userDetails);
    const {
      loading: updateLoading,
      error: updateError,
      isUpdated,
    } = useSelector((state) => state.profile);
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");  

    useEffect(() => {
        if (user && user._id !== id) {
          dispatch(getUserDetails(id));
        } else {
          setName(user.name);
          setEmail(user.email);
          setRole(user.role);
        }
        if (error) {
            dispatch(clearErrors());
          toast.error(error,{
            autoClose: 2000,
            position: toast.POSITION.TOP_CENTER,
            onClose: () => {
              navigate("/admin/users");
            },
          })
        }
    
        if (updateError) {
            dispatch(clearErrors());
            toast.error(error,{
                autoClose: 2000,
                position: toast.POSITION.TOP_CENTER,
                onClose: () => {
                  navigate("/admin/users");
                },
              });
        }
    
        if (isUpdated) {
            dispatch({ type: UPDATE_USER_RESET });
          toast.success("User Updated Sucessfully",{
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            onClose: () => {
              navigate("/admin/users");
            },
          })
        }
      }, [dispatch,  error, isUpdated, updateError, user, id,navigate]);
    
      const updateUserSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);
    
        dispatch(updateUser(id, myForm));
      };
  return (
    <Fragment>
  
        <ToastContainer/>
        <div className="container justify-content-center">
        <div className="card mb-3r" style={{maxWidth: '540px'}}>
      <div className="row g-0 justify-content-center">
        <div className="col-md-8">
          <div className="card-body ">
          <form onSubmit={updateUserSubmitHandler}>
            <h5 className="card-title"><input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                /></h5>
            <p className="card-text">
            <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
            </p>
            <p className="card-text">
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="provider">Provider</option>
                </select>
            </p>
            <center><button className="btn btn-primary m-2" type="submit">Submit</button></center>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div className="fixed-bottom">


    </div>
    </Fragment>
  );
};

export default User;
