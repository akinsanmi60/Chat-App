import React, { useState, useEffect, useRef } from "react";
import ChatInput from "../ChatInput";
import Logout from "../Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../../utils/APIRoutes";
import Container from "./styled";
import { Socket } from "socket.io-client";


type MessageProp = {
  fromSelf: boolean;
  message: string;
}

type ContainerProp = {
  currentChat: {
    avatarImage: string;
  _id: string;
  username: string;
  email: string;
  },
  socket: React.MutableRefObject<Socket | undefined> ;
}


export default function ChatContainer({ currentChat, socket }: ContainerProp) {
  const [messages, setMessages] = useState<MessageProp[]>([]);
  const scrollRef = useRef<HTMLInputElement>(null);
  const [arrivalMessage, setArrivalMessage] = useState<MessageProp>();

  // this hook enable us to receive msg
  useEffect(() => {
    (async () => {
      let userString = localStorage.getItem("chat user")
       const data = userString ? JSON.parse(userString) : null;
      const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    });
    setMessages(response.data);
    })()
  }, [currentChat]);
 

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem("chat user")!)._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);


  // this func enables us to send msg
  const handleSendMsg = async (msg: string) => {
   let userString = localStorage.getItem("chat user")
    const data = userString ? JSON.parse(userString) : null;
    if (!socket.current) { alert(" not connected, please reload"); return; }
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg: any) => {
        return setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  // this hook enables us to scroll message with the chat container  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}