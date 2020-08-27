
import React, { useEffect } from 'react';
import {useHistory } from "react-router-dom";
import makeToast from "../../toaster"
const Logout = () => {
  const history = useHistory()
  useEffect(()=>{
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    makeToast("success", "logged out successfully");
     history.push("/")

  },[])
 
    return(
        <div >
        </div>
      );
}
 export default Logout;