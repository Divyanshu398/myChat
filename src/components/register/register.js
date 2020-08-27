import React, { useState ,useEffect} from 'react';
import { Link ,useHistory} from "react-router-dom";
import makeToast from "../../toaster"
import axios from 'axios';
import './register.css';
function Register() {
  const history = useHistory()
    const [email, setemail] = useState('');
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');

    useEffect(()=>{
      const token = localStorage.getItem("jwt");
   if (token) {
     history.push("/dashboard");
   }
   
     },[])

    const registerUser = ()=>{
        axios.post('http://localhost:5000/register', {
            name,email,password
        })
  .then(res => {
    if(res.data.error){
      makeToast("error", res.data.error);
      console.log(res.data)
   }
   else{
       makeToast("success", res.data.message);
       history.push('/')
       console.log(res.data)
   }
  })
  .catch((err)=>{
    console.log(err);

  })
    }

    return (
        <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading">Register</h1>
          <div>
            <input placeholder="Username" className="joinInput mt-20" type="text" onChange={(event) => setname(event.target.value)} />
          </div>
          <div>
            <input placeholder="Email" className="joinInput mt-20" type="text" onChange={(event) => setemail(event.target.value)} />
          </div>
          <div>
            <input placeholder="Password" className="joinInput mt-20" type="password" onChange={(event) => setpassword(event.target.value)} />
          </div>
          
            <button onClick = {()=>registerUser()} className={'button mt-20'} type="submit">Register</button>
            <h5>
                <Link to="/">Already have an account ?</Link>
            </h5>
        </div>
      </div>
    )
}

export default Register
