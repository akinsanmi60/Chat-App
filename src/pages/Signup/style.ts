/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "styled-components";

export const FormContainer = styled.div`
   .box {
    width: 50%;
    margin: 0 auto;
    background-color: #131324;
    margin-top: 35px;
    box-shadow: 0 0.05em 0.05em 0 rgba(0, 0, 0, 0.25),
      0 0.4em 1em 0 rgba(0, 0, 0, 0.15) !important;
    padding: 3rem 4rem;
     .brand {
    display: grid;
    justify-items: center;
    
    .img {
      height: 7rem;
      width: 100%
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
    }
      @media screen and (min-width: 1025px) {
        width: 40%;
        padding: 4rem 5rem;
      }

      @media screen and (max-width: 425px) {
        width: 100%;
        padding: 3rem 2rem;
    }
    }
 
  input {
      margin-top: 20px;
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }

   p {
       color: white;
    font-size: 15px;
    margin-top: 10px;
    @media screen and (min-width: 1025px) {
      font-size: 18px;
    }
    @media screen and (max-width: 425px) {
      font-size: 17px;
    }
    @media screen and (max-width: 375px) {
      font-size: 17px;
    }
    @media screen and (max-width: 320px) {
      font-size: 15px;
    }
  }
  
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export const ButtonStyled = styled.button`
  background-color: #4e0eff;
  margin-top: 15px;
  padding: 0.7rem 2rem;
  color: white;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  border-radius: 4px;
  outline: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  margin-top: 10px;
  font-size: 0.9375rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  min-width: 64px;
   &:hover {
      background-color: #4e0eff;
    }
  @media screen and (max-width: 425px) {
    margin-top: 15px;
    width: 30%;
    padding: 0.3rem 0rem;
    font-size: 0.8rem;
  }
  `;