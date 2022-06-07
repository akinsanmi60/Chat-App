import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    
    *{
        margin: 0;
        padding: 0;
        list-style: none;
        box-sizing: border-box;
        font-family: 'Nunito', sans-serif;
        text-decoration: none;
    }
    body{
        background-color:  #F2F6FF;
        font-size: 1.2rem;
    }
    a{
        color: inherit;
    }
    .secondary-heading{
        font-size: 3rem;
        
        
    }
    .small-heading{
        font-size: 2.5rem;
        text-align: center;
    }
    //Utilities
    .c-para{
        text-align: center;
    }
    .Toastify__toast-theme--dark {
  background-color: #00000076 !important;

   p {
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
}
  
`;

export default GlobalStyle;
