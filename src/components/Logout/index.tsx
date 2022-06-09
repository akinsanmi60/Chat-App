import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import axios from "axios";
import { logoutRoute } from "../../utils/APIRoutes";
import { Button } from "./style";
export default function Logout() {
  const navigate = useNavigate();
    const handleClick = async () => {
      let idString =  localStorage.getItem("chat user")
        const id = idString ? JSON.parse(idString)._id : null;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}
