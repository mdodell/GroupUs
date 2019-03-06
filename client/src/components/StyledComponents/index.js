import styled from 'styled-components';

import { device } from './devices';

//Page Backgrounds

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

//Login
export const LoginFormContainer = styled.div`
   width: 450px; 
   background: #fff;
   border-radius: 3px;
   overflow: hidden;
   padding: 77px 15px 30px;
   text-align: center;
   
   @media ${device.tablet} {
        padding-left: 50px;
        padding-right: 50px;
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
    font-weight: 900;
`;

export const LoginForm = styled.form`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;  
`;

export const InputWrapper = styled.div`
    position: relative;
    width: 100%;
    margin: 5px 0;
`;

export const InputIcon = styled.span`
    position: absolute;
    font-size: 28px;
    top: 10px;
    left: 20px;
    width:24px;
    height:24px;
    color: #686868;
    -webkit-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
`;

export const LoginInput = styled.input`
    font-size: 18px;
    line-height: 1.2;
    color: #686868;
    display: block;
    width: 100%;
    background: #e6e6e6;
    height: 62px;
    border-radius: 3px;
    padding: 0 30px 0 65px;
    outline: none;
    border: none;
   
        &:focus ~ ${InputIcon} {
            color: #1CB5E0!important;
            -webkit-transform: translate(-5px, 0);
            -ms-transform: translate(-5px, 0);
                    transform: translate(-5px, 0)
        }
    }
`;

export const FormText = styled.p`
    font-size: 16px;
    color: #999;
    line-height: 1.4;
    padding-top: 42px;
    padding-bottom: 22px;
`;

export const FormFooterText = styled(FormText)`
    padding-top: 50px;
    padding-bottom: 0;
`;

export const LoginButton = styled.button`
    font-weight: 900;
    font-size: 16px;
    line-height: 1.5;
    color: #fff;
    text-transform: uppercase;
    width: 100%;
    height: 62px;
    border-radius: 3px;
    background: #1CB5E0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
            align-items: center;
    padding: 0 25px;
    -webkit-transition: all .4s;
    -o-transition: all .4s;
    transition: all .4s;
    outline: none!important;
    border: none;
    margin-top: 30px;
    &:hover { 
        background: black;
        cursor: pointer;
    }
`;

export const SocialAuthenticationButton = styled.a`
    font-weight: 900;
    font-size: 16px;
    line-height: 1.2;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    border-radius: 3px;
    border: 1px solid #e6e6e6;
    background-color: #fff;
    transition: all .4s;
    
    &:hover {
        color: #1CB5E0;
        border: 1px solid #1CB5E0;
    }
`;

export const GoogleButtonWrapper = styled(SocialAuthenticationButton)`
    color: #555;
`;

export const FacebookButtonWrapper = styled(SocialAuthenticationButton)`
    color: #3b5998;
`;

export const SocialAuthenticationButtonIcon = styled.img`
    height: 20px;
    width: 20px;
    margin-right: 10px;
`;

export const FormFooterTextLink = styled.a`

`;

//Dashboard
export const DisplayEventsContainer = styled.div`
    width: 100%;
    height: 90vh;
    background-color: #e6e6e6;
    position: absolute;
    bottom: 0;
`;

export const AddEventButton = styled.div`
    position: absolute;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: blue;
    bottom: 10px;
    right: 10px;
    display: flex;
    color: white;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease-in;
    border: 1px solid black;
    font-size: 24px;
    
    &:hover {
        cursor: pointer;
        background-color: lightblue;
        
    }
`;
