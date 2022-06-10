import React, { useState, useEffect } from "react";
import Robot from "../../assets/robot.gif";
import { Container } from "./style";


export default function Welcome() {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        (async () => {
            setUserName(
                await JSON.parse(
                    localStorage.getItem("chat user")!).username
            );
        })()
    }, []);
    return (
        <Container>
            <img src={Robot} alt="" />
            <h1>
                Welcome, <span>{userName}!</span>
            </h1>
            <h3>Please select a chat to Start messaging.</h3>
        </Container>
    );
}