import React ,{ useState, useEffect } from "react";


import io from "socket.io-client";
import './chat.css';
import InfoBar from "../InfoBar/InfoBar"
import Input from "../Input/Input"
import Messages from "../Messages/Messages"
import TextContainer from "../TextContainer/TextContainer"
var socket
const Chat = (props) => {
    const [name, setname] = useState('');
    const [room, setroom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState('');
    const username = localStorage.getItem("username");
    const chatroom = props.match.params.name
    const ENDPOINT = "localhost:5000"
    useEffect(()=>{
        socket = io(ENDPOINT)
        setname(username)
        setroom(chatroom)
        socket.emit("join",{name:username,room:chatroom},()=>{
            // this is executed when callback is called in server
        })

        return ()=>{
            socket.emit("disconnect")
            socket.off()
            
        }
        
        
    },[ENDPOINT,chatroom, username])

   useEffect(()=>{
       socket.on("message",(message)=>{
           setMessages([...messages, message])
       })
       socket.on("roomData", ({ users }) => {
        setUsers(users);
      });
   },[messages]);

   //function for sending messsages
   const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
        
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }
  console.log(message,messages)
  
        
    
    
    return(
        <div className ="outerContainer">
            <div className = "container">
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users}/>
        </div>
    )
}
 export default Chat;