import axios from "axios";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { formatDistanceToNow } from "date-fns";

const socket = io.connect(`${process.env.REACT_APP_DOMAIN}`);

const ChatModal = ({ visible, onClose, data }) => {
  const trackid = data.trackID;
  const shipmentid = data.shipmentId;
  const [currentMessage, setCurrentMessage] = useState("");
  const [messagelist, setMessagelist] = useState([]);
  const [hubName, setHubName] = useState("");
  const [typingTimeout,setTypingTimeout]=useState(null)
  const [typing ,setTyping]=useState(false)


  const sendmessage = async (e) => {

    e.preventDefault();

    if (currentMessage.length !== 0) {
      const messageData = {
        room: trackid,
        author: shipmentid,
        message: currentMessage,
      };

      socket.emit("send_message", messageData);

      setMessagelist((list) => [
        ...list,
        { currentmessage: currentMessage, time: new Date() },
      ]);
      setCurrentMessage("");
      socket.emit("typing", { room: trackid, typing: false });
    }
  };
  useEffect(() => {
    socket.emit("join-room", trackid);
  }, [trackid, shipmentid]);

  const getChatHistory = async () => {
    const requestData = {
      trackid,
      shipmentid,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DOMAIN}/getchathistory`,
        requestData
      );
      if (response.data.success) {
        const chat = response.data.chat;
        for (let i = 0; i < chat.length; i++) {
          if (chat[i].author === shipmentid) {
            setMessagelist((list) => [
              ...list,
              { currentmessage: chat[i].message, time: chat[i].time },
            ]);
          } else {
            setMessagelist((list) => [
              ...list,
              {
                message: chat[i].message,
                author: chat[i].author,
                time: chat[i].time,
              },
            ]);
          }
        }
        setHubName(response.data.hubname);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    getChatHistory();
  }, []);

  useEffect(() => {
    const handleReceivedMessage = (data) => {
      const { room, author, message } = data;
      if (author !== shipmentid && room === trackid) {
        setMessagelist((list) => [
          ...list,
          { message: message, author: author, time: new Date() },
        ]);
      }
    };

    socket.on("receive_message", handleReceivedMessage);

    return () => {
      socket.off("receive_message", handleReceivedMessage);
    };
  }, [shipmentid, trackid]);


  const handlemessage = (e)=>{
    setCurrentMessage(e.target.value);
  socket.emit("typing-started")
  if(typingTimeout) clearTimeout(typingTimeout)

  setTypingTimeout ( setTimeout(()=>{
    socket.emit("typing-stoped")

  },1000))
}

  useEffect(()=>{
    if(!socket) return
  
    socket.on("typing-started-from-server",()=>setTyping(true))
    socket.on("typing-stoped-from-server",()=>setTyping(false))
    
  },[socket])


  if (!visible) return null;
  return (
    <div>
      <div
        id="container"
        className={`fixed right-4 bottom-10 flex justify-center items-center z-50  ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none bg-zinc-600"
        } transition-opacity duration-300`}
      >
        <div className="flex justify-center">
          <div className="bg-white border rounded-lg overflow-hidden w-full max-w-md shadow-lg">
            <div className="bg-blue-500 text-white p-2 flex justify-between items-center relative">
              <h1 className="font-semibold ml-3">{data.hub} Hub</h1>
              <div
                cl
                class="h-2
    
    w-2 absolute  rounded-full ring ring-white bg-green-600"
              ></div>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => onClose()}
              >
                {/* Close button (X icon) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <h1 className="text-center text-indigo-600 text-2xl font-semibold my-4">
              Chatbox
            </h1>
            <div className="flex-grow w-full overflow-y-auto max-h-72">
              <div
                id="messages"
                className="flex flex-col w-full space-y-4 p-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
              >
                {messagelist.map((items, index) => {
                  if (items.message) {
                    const timeAgo = formatDistanceToNow(new Date(items?.time), {
                      addSuffix: true,
                    });
                    return (
                      <div
                        className="chat-message w-full flex justify-start mb-4"
                        key={index}
                      >
                        <div className="flex flex-col w-full space-y-2 text-xs max-w-md mx-2 items-start">
                          <div className="w-full">
                            <span className="px-4 py-2 rounded-lg inline-block rounded-tl-none bg-gray-300 text-gray-600 break-words">
                              {items.message}
                            </span>
                            <p className="text-xs text-left text-gray-500 ">
                              {timeAgo}
                            </p>
                          </div>
                        </div>
                        {items.message && (
                          <>{/* Add partner's profile image here */}</>
                        )}
                      </div>
                    );
                  } else {
                    const timeAgos = formatDistanceToNow(
                      new Date(items?.time),
                      {
                        addSuffix: true,
                      }
                    );
                    return (
                      <div
                        className="chat-message w-full flex justify-end mb-4"
                        key={index}
                      >
                        <div className="flex flex-col space-y-2 text-xs max-w-md  items-end">
                          <div>
                            <span className="px-4 py-2 my-1 rounded-lg inline-block rounded-tr-none bg-blue-600 text-white break-words">
                              {items.currentmessage}
                            </span>
                            <p className="text-xs text-right text-gray-500  ">
                              {timeAgos}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            {typing && (
                <div className="text-gray-500">typing...</div>
              )}
            <div className="flex justify-between items-center border-t p-2">
              <input
                type="text"
                value={currentMessage}
                onChange={handlemessage}
                className="flex-1 px-2 py-1 border rounded-md bg-slate-300"
                placeholder="Type your message..."
              />
              <button
                type="button"
                onClick={sendmessage}
                className="bg-gray-700 hover:bg-blue-600 text-white font-semibold rounded-full ml-2"
              >
                <span className="material-symbols-outlined px-3 py-1">
                  send
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
