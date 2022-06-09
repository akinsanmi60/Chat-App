import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo.svg";
import { Container } from "./style";


type DataProp = {
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


type ChatContactProp = {
    contacts: ContactProp[];
    changeChat: Function;
}
export default function Contacts({ contacts, changeChat }: ChatContactProp) {
    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserImage, setCurrentUserImage] = useState("");
    const [currentSelected, setCurrentSelected] = useState<number>();

    useEffect(() => {
        (async () => {
            let userString = localStorage.getItem("chat user")
            const data: DataProp = userString ? await JSON.parse(userString) : null;
            setCurrentUserName(data.username);
            setCurrentUserImage(data.avatarImage);
        })()
    }, []);


    const changeCurrentChat = (index: any, contact: any) => {
        setCurrentSelected(index);
        changeChat(contact);
    };
    return (
        <>
            {currentUserImage && currentUserImage && (
                <Container>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h3>Current Zone</h3>
                    </div>
                    <div className="contacts">
                        {contacts.map((contact, index) => {
                            return (
                                <div
                                    key={contact._id}
                                    className={`contact ${index === currentSelected ? "selected" : ""
                                        }`}
                                    onClick={() => changeCurrentChat(index, contact)}
                                >
                                    <div className="avatar">
                                        <img
                                            src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                            alt=""
                                        />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="current-user">
                        <div className="avatar">
                            <img
                                src={`data:image/svg+xml;base64,${currentUserImage}`}
                                alt="avatar"
                            />
                        </div>
                        <div className="username">
                            <h2>{currentUserName}</h2>
                        </div>
                    </div>
                </Container>
            )}
        </>
    );
}