import React  from 'react';
import { Link} from "react-router-dom";
import axios from 'axios';



const AllChatrooms = (props) => {
   
    const [chatrooms, setChatrooms] = React.useState([]);
    const getChatrooms = () => {
      axios
        .get("http://localhost:5000/allchatrooms", {
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

    React.useEffect(() => {
        const token = localStorage.getItem("jwt");
    if (!token) {
      props.history.push("/login");
    }
      getChatrooms();
      // eslint-disable-next-line
    }, [chatrooms]);
  
    return (
       
          <div>
              <Link to={"/logout"}>
                  <div>Logout</div>
                </Link>
        <div className="card">
            
          <div className="cardHeader">Chatrooms</div>
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
      
        
        </div>
     
        </div>
        
      );
  };
  

export default AllChatrooms
