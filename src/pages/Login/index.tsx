import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, ToastPosition, Theme } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactComponent as Logo } from "../../asset-folder/logo.svg";
import { loginRoute } from "../../utils/APIRoutes";
import { ButtonStyled, FormContainer } from "./style";

type ToastProp = {
  position: ToastPosition | undefined;
  autoClose: number;
  pauseOnHover: boolean;
  draggable: boolean;
  theme: Theme | undefined;
}


function Login() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: "",
    password: "",
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
    const { username, password } = values
    if (username === "") {
      toast.error("Username must be filled", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Password must be filled", toastOptions);
      return false;
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { username, password } = values
    try {
      e.preventDefault();
      if (handleValidation()) {
        const { data } = await axios.post(loginRoute, {
          username,
          password
        })
        if (data.status === false) {
          toast.error(data.msg, toastOptions)
        }
        if (data.status === true) {
          localStorage.setItem("chat user",
            JSON.stringify(data.user)
          );
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
      <>
        <FormContainer>
          <div className="box">
            <div className="brand">
              <Logo className="img" />
              <h1>Connect zone</h1>
            </div>
            <form action="" onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => handleChange(e)}
              />
              <ButtonStyled type="submit">Login</ButtonStyled>
              <p>
                Don't have an account ?... <Link to="/register">{" "}Register.</Link>
              </p>
            </form>
          </div>
        </FormContainer>
        <ToastContainer />
      </>
    );
}
export default Login;
