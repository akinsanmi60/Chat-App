import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
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

type ChatProp = {
  chat: {
    avatarImage: string;
  _id: string;
  username: string;
  email: string;
  }
}
export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState<ContactProp[]>([]);
  const [currentChat, setCurrentChat] = useState({
    avatarImage: "",
    _id: "",
    username: "",
    email: "",
});
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
  },[]); 


  // useEffect(() => {
  //   if (currentUser) {
  //     socket.current = io(host);
  //     socket.current.emit("add-user", currentUser._id);
  //   }
  // }, [currentUser]);

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
  const handleChatChange = ({chat}: ChatProp) => {
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