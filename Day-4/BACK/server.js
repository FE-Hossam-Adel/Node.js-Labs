import express from "express";
import {Server} from "socket.io";
import cors from "cors";

const app = express();
app.use(cors({}))
app.get("/",(req,res)=>{
  res.send("Hello Wolrld");
})


const httpServer = app.listen(3000,()=>{
  console.log("http://localhost:3000");
});


const io = new Server(httpServer,{
  cors:"*"
});

io.on('connection' , (socket)=>{
  socket.emit('user',socket.id)
  socket.on('msg',(message)=>{
    io.emit('msg' , {message , id:socket.id})
  })
})