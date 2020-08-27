import React, { useState } from 'react';
import { Link,useHistory } from "react-router-dom";
import makeToast from "../../toaster"
import axios from 'axios';
import ScrollToBottom from 'react-scroll-to-bottom';

import "./dashboard.css"
const Dashboard = (props) => {
    const [room, setRoom] = useState('');
    const history = useHistory()
    const [chatrooms, setChatrooms] = React.useState([]);
    const getChatrooms = () => {
      axios
        .get("http://localhost:5000/chatrooms", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
        .then((response) => {
            // console.log(response.data)
          setChatrooms(response.data);
        })
        .catch((err) => {
            console.log(err)
        //   setTimeout(getChatrooms, 3000);
        });
    };

    const JoinUser = ()=>{
        axios
        .post("http://localhost:5000/chatrooms", {name:room},
        {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            }
          }

          
        )
        .then((res) => {
            // console.log(res.data)
            if(res.data.error){
                makeToast("error", res.data.error);
                
             }
             else{
                 makeToast("success", res.data.message);
                 history.push('/dashboard')
                //  console.log(res.data)
             }
        })
        .catch((err) => {
            console.log(err)
        //   setTimeout(getChatrooms, 3000);
        });

        
  
      }
  
    React.useEffect(() => {
        const token = localStorage.getItem("jwt");
    if (!token) {
      props.history.push("/login");
    }
      getChatrooms();
      // eslint-disable-next-line
    }, [chatrooms]);
  
    return (
      <ScrollToBottom>
        <div>
            <Link to={"/logout"}>
                <div>Logout</div>
              </Link>
      <div className="card">
          
        <div className="cardHeader">Chatrooms</div>
        <div className="cardBody">
          <div className="inputGroup">
            <label htmlFor="chatroomName">Chatroom Name</label>
            <input
              type="text"
              id="chatroomName"
              placeholder="Create Your Chatroom"
              onChange={(event) => setRoom(event.target.value)}
            />
          </div>
        </div>
        <button onClick = {()=>JoinUser()} className={'button mt-20'} type="submit">Create Chatroom</button>
        <div className="chatrooms">
          {chatrooms.map((chatroom) => (
            <div key={chatroom._id} className="chatroom">
              <div>{chatroom.name}</div>
              <Link to={"/chatroom/" + chatroom._id+"/"+chatroom.name}>
                <div className="join">Join</div>
              </Link>
            </div>
          ))}
          

        </div>
        <Link to={"/allChatrooms"}>
                <b>View all chatrooms</b>
              </Link>
      
      </div>
   
      </div>
       </ScrollToBottom>
    );
  };
  

export default Dashboard
