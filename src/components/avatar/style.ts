import styled from "styled-components";


export const AvatarContainer = styled.div`
    .container{
margin-top: 200px;
display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 25px;
     
    }

      .title-container {
        h1 {
          color: white;
          font-size: 30px;
        }
      }
      .avatars {
        display: flex;
        gap: 2rem;
        @media screen and (max-width: 375px) {
          flex-direction: column;
    }

        .avatar {
          border: 0.2rem solid transparent;
          padding: 0.3rem;
          border-radius: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: 0.5s ease-in-out;
          img {
            height: 3rem;
            transition: 0.5s ease-in-out;
          }
        }
        .selected {
          border: 0.2rem solid #4e0eff;
        }
      }
      .submit-btn {
        background-color: #4e0eff;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        &:hover {
          background-color: #4e0eff;
        }
      }
    }
`;
