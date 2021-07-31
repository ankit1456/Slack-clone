import React from "react";
import styled from "styled-components";
import moment from "moment";

const Message = ({ message, user, userImage, timestamp }) => {
  return (
    <MessageContainer>
      <img src={userImage} alt='' />
      <MessageInfo>
        <h4>
          {user}{" "}
          <span>
            {moment(new Date(timestamp?.toDate()).toUTCString()).fromNow()}
          </span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
};

export default Message;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;

  > img {
    height: 5rem;
    object-fit: contain;
    border-radius: 0.8rem;
  }
`;
const MessageInfo = styled.div`
  padding-left: 1rem;

  > h4 > span {
    color: #313030;
    font-size: 1rem;
    margin-left: 0.4rem;
    font-weight: 400;
  }
`;
