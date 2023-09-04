import React, { useEffect } from "react";
import { useState } from "react";
import io from "socket.io-client";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import {formatDistanceToNow} from 'date-fns'
import { useDispatch } from "react-redux";
import axios from "axios";
// import './guidechat.css'

// import { guideRequest } from '../../axios'
const socket = io.connect("http://localhost:5000");


export default function Guidechat() {
 const dispatch=useDispatch()
  const [currentmessage, setCurrentmessage] = useState("");
  const [messagelist, setMessagelist] = useState([]);
  const[name,setName]=useState('')
  const location=useLocation()
  const data=location.state
  const id=data.id
  const userid=data.guide


  const sendmessage = async () => {
    if (currentmessage.length !== 0) {
      const messageData = {
        room: id,
        author: userid,
        message: currentmessage,
      
      };
       socket.emit("send_message", messageData);
      setMessagelist((list) => [...list, {currentmessage:currentmessage,time:new Date()}]);
      setCurrentmessage('')
      
    }
  };


  
  const getChatHistory=async()=>{
    const data={
      id,
      userid

    }
   
   const response= await axios.post('/api/guide/chathistory',{data})
   if (response.data.success) {
    const chat=response.data.chat
  for(let i=0;i<chat.length;i++){
    if(chat[i].author===userid){
      setMessagelist((list) => [...list, {currentmessage:chat[i].message,time:chat[i].time}]);
  
    }else{
      setMessagelist((list) => [
        ...list,
        { message: chat[i].message, author:chat[i].author, time:chat[i].time},
      ]);

    }
  }
   
    
   }
   setName(response.data.name)
  }
  
  useEffect(()=>{
    getChatHistory()
  },[])
  

useEffect(() => {
    const handleReceivedMessage = (data) => {
      const { room, author, message } = data;
      if (author !== userid && room === id) {
        setMessagelist((list) => [
          ...list,
          { message: message, author: author, time: new Date() },
        ]);
      }
    };
  
    socket.on("receive_message", handleReceivedMessage);
    socket.emit("join-room", id);
  
    return () => {
      socket.off("receive_message", handleReceivedMessage);
    };
  }, [userid, id]);
  
  return (
  <div class="h-screen">   
  <Navbar/>
    <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col ">
    {/* Chat Header */}
    <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200 w-full">
      <div className="relative flex items-center space-x-4 w-full">
      <div className="relative">
        <span className="absolute text-green-500 right-0 bottom-0">
          <svg width="20" height="20">
            <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
          </svg>
        </span>
        <img
          src='https://res.cloudinary.com/dft5pexxb/image/upload/v1693729281/l4cnrmtd8ur7xexhlmkz.png'
          alt=""
          className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
        />
        
      </div>
        <div className="flex flex-col leading-tight">
          <div className="text-2xl mt-1 flex items-center">
            {name}
          </div>
          {/* Display partner's job title */}
        </div>
      </div>
    </div>
  
    {/* Chat Messages */}
    <div className="flex-grow w-full overflow-y-auto">
    <div id="messages" className="flex flex-col w-full space-y-4 p-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      {messagelist.map((items) => {
        if (items.message) {
          const timeAgo = formatDistanceToNow(new Date(items?.time), {
            addSuffix: true,
          });
          return (
            <div className="chat-message w-full flex justify-start mb-4" key={items.id}>
              <div className="flex flex-col w-full space-y-2 text-xs max-w-xs mx-2 items-start">
                <div className="w-full">
                  <span className="px-4 py-2 rounded-lg inline-block rounded-tl-none bg-gray-300 text-gray-600">
                    {items.message}
                  </span>
                  <p className="text-xs text-left text-gray-500 mt-1">{timeAgo}</p>
                </div>
              </div>
              {items.message && (
                <>
                  {/* Add partner's profile image here */}
                </>
              )}
            </div>
          );
        } else {
          const timeAgos = formatDistanceToNow(new Date(items?.time), {
            addSuffix: true,
          });
          return (
            <div className="chat-message w-full flex justify-end mb-4" key={items.id}>
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 items-end">
                <div>
                  <span className="px-4  py-2 my-4 rounded-lg inline-block rounded-tr-none bg-blue-600 text-white">
                    {items.currentmessage}
                  </span>
                  <p className="text-xs text-right text-gray-500 mt-1">{timeAgos}</p>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
    </div>
  
    {/* Message Input */}
    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div className="relative flex">
        <span className="absolute inset-y-0 flex items-center"></span>
        <input
        value={currentmessage}
          type="text"
          onChange={(event) => {
            setCurrentmessage(event.target.value);
          }}
          placeholder="write here"
          className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
        />
        <div className="absolute right-0 items-center inset-y-0 flex">
          <button
            type="button"
            onClick={sendmessage}
            className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-400 hover:bg-blue-400 focus:outline-none"
          >
            <span style={{color:"blue"}} className="font-bold">Send</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="blue"
              className="h-6 w-6 ml-2 transform rotate-90"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  
  </div>
  );
}