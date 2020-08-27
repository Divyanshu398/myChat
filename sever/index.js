const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
require("dotenv").config();
const cors = require('cors');
const mongoose = require("mongoose");
const router = require('./router');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
//   mongoose.connection.on("error", (err) => {
//     console.log("Mongoose Connection ERROR: ");
//   });
  
  mongoose.connection.once("open", () => {
    console.log("MongoDB Connected!");
  });

const PORT = process.env.PORT || 5000

const server = http.createServer(app);
const io = socketio(server);
io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(socket.id)
    socket.on("join",({name,room},callback)=>{
      const { error, user } = addUser({ id: socket.id, name, room });
      if(error) return callback(error)
      console.log(user)
      socket.join(user.room)
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
      callback();
    })

    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);
      
  
      io.to(user.room).emit('message', { user: user.name, text: message });
  
      callback();
    });

    socket.on('disconnect', () => {
      const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
        console.log('a user left');
      });

  });
 
app.use('/',router)

server.listen(PORT, ()=>{
    console.log("listening to", PORT)
});
