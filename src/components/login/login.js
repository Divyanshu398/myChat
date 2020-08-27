import React ,{ useState,useEffect } from 'react'
import { Link ,useHistory} from "react-router-dom";
import makeToast from "../../toaster"
import axios from 'axios';
import './login.css';

const Login = () => {
    // const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    useEffect(()=>{
       const token = localStorage.getItem("jwt");
    if (token) {
      history.push("/dashboard");
    }
    
      },[])
    const loginUser = ()=>{
        axios.post('http://localhost:5000/login', {
            email,password
        }).then((res)=>{
            if(res.data.error) {
                makeToast("error", res.data.error);
                // console.log(res.data)
            }
            else{
                console.log(res.data)
                localStorage.setItem("jwt",res.data.token)
                localStorage.setItem("user",res.data.userID)
                localStorage.setItem("username",res.data.username)
                // dispatch({type:"USER",payload:res.data.username})
                makeToast("success", res.data.message);
                history.push('/dashboard')
            }

        }).catch((err)=>{
            console.log(err)
        })

    }
    return (
        <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading">Login</h1>
          <div>
            <input placeholder="Email" className="joinInput mt-20" type="text" onChange={(event) => setemail(event.target.value)} />
          </div>
          <div>
            <input placeholder="Password" className="joinInput mt-20" type="password" onChange={(event) => setpassword(event.target.value)} />
          </div>
          
            <button onClick ={()=>loginUser()} className={'button mt-20'} type="submit">Login</button>
            <h5>
                <Link to="/register">Don't have an account ?</Link>
            </h5>
        

        </div>
      </div>
    )
}

export default Login
