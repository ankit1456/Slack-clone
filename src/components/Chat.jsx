import React, { useRef } from "react";
import styled from "styled-components";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useSelector } from "react-redux";
import { selectChannelId } from "../redux/appSlice";
import ChatInput from "./ChatInput";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";

const Chat = () => {
  const channelId = useSelector(selectChannelId);
  const [channelDetails, loading, error] = useDocument(
    channelId && db.collection("channels").doc(channelId)
  );

  const [messages] = useCollection(
    channelId &&
      db
        .collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
  );
  return (
    <ChatContainer>
      {channelDetails && messages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>
                  #{channelDetails?.data()?.channelName || "Room Name"}
                </strong>
              </h4>
              <StarBorderOutlinedIcon fontSize='large' />
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlinedIcon fontSize='large' /> Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {messages?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();

              return (
                <Message
                  key={message.id}
                  user={user}
                  userImage={userImage}
                  timestamp={timestamp}
                  message={message}
                />
              );
            })}
            <ChatBottom />
          </ChatMessages>

          <ChatInput
            channelId={channelId}
            channelName={channelDetails?.data()?.channelName}
          />
        </>
      )}
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  flex: 1;
  margin-top: 6rem;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 1rem;
  }

  ::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 0.8rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
  }
  > .MuiSvgIcon-root {
    margin-left: 1rem;
  }
`;
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    > .MuiSvgIcon-root {
      margin-right: 1.6rem;
    }
  }
`;
const ChatMessages = styled.div``;

const ChatBottom = styled.div`
  padding-bottom: 10rem;
`;
