import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, ToastPosition, Theme } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ButtonStyled, FormContainer } from "./style";
import { registerRoute } from "../../utils/APIRoutes";
import axios from "axios";

type ToastProp = {
  position: ToastPosition | undefined;
  autoClose: number;
  pauseOnHover: boolean;
  draggable: boolean;
  theme: Theme | undefined;
}


function Register() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const toastOptions: ToastProp = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    if (localStorage.getItem("chat user")) {
      navigate("/")
    }
  }, [navigate])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;

  };

  const hanleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { password, confirmPassword, username, email } = values;
    try {
      e.preventDefault()

      if (handleValidation()) {
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
          confirmPassword,
        })
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
         if (data.status === true) {
        localStorage.setItem( "chat user",
          JSON.stringify(data.user)
        );
        navigate("/");
      }
      }
    } catch (error) {
      console.error(error);
    }

  }
  return (
    <><FormContainer>
      <div className="box">
        <div className="brand">
          <Logo className="img" />
          <h1>Connect zone</h1>
        </div>
        <form action="" onSubmit={(e) => hanleSubmit(e)}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)} />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)} />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)} />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)} />
          <ButtonStyled type="submit">Create</ButtonStyled>
          <p>
            Already have an account?...<Link to="/login">{" "} Login.</Link>
          </p>
        </form>
      </div>
    </FormContainer>
      <ToastContainer />
    </>
  );
}

export default Register;
