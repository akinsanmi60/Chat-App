/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
import { ToastContainer, toast, ToastPosition, Theme } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircleLoaderComponent } from "./component/loader";
import { setAvatarRoute } from "../../utils/APIRoutes";
import { AvatarContainer } from "./style";
import InnerLayout from "../../styles/layout"

type ToastProp = {
  position: ToastPosition | undefined;
  autoClose: number;
  pauseOnHover: boolean;
  draggable: boolean;
  theme: Theme | undefined;
}

function SetAvatar() {
  const api = `https://api.multiavatar.com/2161988`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const toastOptions: ToastProp = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

// fectching avatar 
  useEffect(() => {
    const data: React.SetStateAction<string[] | ((prevState: never[]) => never[])> = [];
    (async () => {
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data?.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    })();
  }, [api]);


  useEffect(() => {
    (async () => { 
      if (!localStorage.getItem("chat user"))
        navigate("/login");
     })()
  }, [navigate]);

  const setProfilePicture = async () => {
    try {
      if (selectedAvatar === undefined) {
        toast.error("Please select an avatar", toastOptions)
      } else {
        // this enable to store user as an object in the localStorage
        let userString = localStorage.getItem("chat user")
        const user = userString ? JSON.parse(userString) : null;
        console.log("999999999", user)
        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: avatars[selectedAvatar],
        });

        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem("chat user", JSON.stringify(user));
          console.log("33333333333", user)
          navigate("/")
        } else {
          toast.error("Error setting avatar", toastOptions)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <InnerLayout>
      {isLoading ? (
        <AvatarContainer>
          <div className="container">
            <CircleLoaderComponent />
          </div>
        </AvatarContainer>
      ) : (
          <AvatarContainer>
            <div className="container">
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars?.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${selectedAvatar === index ? "selected" : ""
                    }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Select
          </button>
              <ToastContainer />
              </div>
        </AvatarContainer>
      )}
    </InnerLayout>
  );
}

export default SetAvatar;





