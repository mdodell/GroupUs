import styled from 'styled-components';

import { device } from './devices';

export const LoginBackground = styled.div`
    min-height: 100vh;
    padding: 15px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
            align-items: center;
    background: #000046;
    background-image: -webkit-gradient(linear, left top, right bottom, from(#000046), to(#1CB5E0));
    background-image: -webkit-linear-gradient(top left, #000046, #1CB5E0);
    background-image: -o-linear-gradient(top left, #000046, #1CB5E0);
    background-image: linear-gradient(to bottom right, #000046, #1CB5E0);
    overflow: scroll;
    overflow-x: hidden;
`;

export const LoginFormContainer = styled.div`
   width: 450px; 
   background: #fff;
   border-radius: 3px;
   overflow: hidden;
   padding: 77px 50px 30px;
   
   @media ${device.mobileS} {
        padding: 25px 50px 30px;
   }
`;

export const FormTitle = styled.h1`
    font-size: 30px;
    color: #333333;
    line-height: 1.2;
    text-transform: uppercase;
    text-align: center;
    width: 100%;
    display: block;
    padding-bottom: 55px;
`;

export const LoginForm = styled.form`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-wrap: wrap;  
`;