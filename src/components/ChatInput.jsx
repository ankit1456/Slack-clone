import React, { useState } from "react";
import styled from "styled-components";
import { db, auth } from "../firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const ChatInput = ({ channelId, channelName }) => {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);
  const sendMessage = (e) => {
    e.preventDefault();
    if (!channelId) {
      return false;
    }

    db.collection("channels").doc(channelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });

    setInput("");
  };
  return (
    <ChatInputContainer>
      <form>
        <input
          type='text'
          placeholder={`Message #${channelName || "room"}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type='submit' onClick={sendMessage}>
          SEND
        </button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;

const ChatInputContainer = styled.div`
  > form {
    position: relative;
    display: flex;
    justify-content: center;

    > button {
      display: none;
    }
    > input {
      position: fixed;
      bottom: 3rem;
      width: 60%;
      border: 1px solid gray;
      padding: 1.5rem;
      font-size: 1.6rem;
    }
  }
`;
