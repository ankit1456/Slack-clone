import React from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { setChannel } from "../redux/appSlice";

const SidebarOption = ({ Icon, title, addChannelOtption, id, setOpen }) => {
  const dispatch = useDispatch();

  const addChannel = () => {
    const channelName = prompt("Please enter channel name :");
    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
      });
    }

    if (setOpen) {
      setOpen(false);
    }
  };
  const selectChannel = () => {
    if (id) {
      dispatch(
        setChannel({
          channelId: id,
        })
      );
    }

    if (setOpen) {
      setOpen(false);
    }
  };
  return (
    <SidebarOptionContainer
      onClick={addChannelOtption ? addChannel : selectChannel}
    >
      {Icon && <Icon style={{ fontSize: 18 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span>
          {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
};

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 1.2rem;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  & > h3 {
    margin-left: 1rem;
    font-weight: 500;
  }
`;
const SidebarOptionChannel = styled.h3`
  font-weight: 300;
  display: flex;
  align-items: center;
  > span {
    margin-right: 1rem;
    font-size: 2rem;
  }
`;
