import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { allUsersRoute, host } from "../../utils/APIRoutes";
import ChatContainer from "../../components/ChatContainer";
import Contacts from "../../components/ChatContact";
import Welcome from "../../components/Welcome";
import Container from "./style";

type CurrentProp = {
  avatarImage: string;
  _id: string;
  username: string;
  isAvatarImageSet: boolean;
}

type ContactProp = {
  avatarImage: string;
  _id: string;
  username: string;
  email: string;
}


export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef<Socket>();
  const [contacts, setContacts] = useState<ContactProp[]>([]);
  const [currentChat, setCurrentChat] = useState<ContactProp>();
  const [currentUser, setCurrentUser] = useState<CurrentProp>();


  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("chat user") || "") {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(localStorage.getItem("chat user") || "")
        );
      }
    })()
  }, [navigate]);


  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data?.data);
        } else {
          navigate("/setAvatar");
        }
      }
    })()
  }, [currentUser, navigate]);

  const handleChatChange = (chat: ContactProp) => {
    console.log("+++++", chat)
    setCurrentChat(chat);
  };


  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}