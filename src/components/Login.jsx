import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

const Login = () => {
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };
  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src='https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg'
          alt=''
        />
        <h1>Sign in to Code The Web</h1>
        <p>codetheweb.slack.com</p>

        <Button type='submit' onClick={signIn}>
          Sign in with Google
        </Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;
const LoginInnerContainer = styled.div`
  padding: 10rem;
  text-align: center;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    height: 15rem;
    object-fit: contain;
    margin-bottom: 4rem;
  }

  > button {
    margin-top: 5rem;
    background-color: #0a8d48 !important;
    color: #fff;
    font-size: 1.7rem;
    padding: 1rem 3rem;
  }
`;
