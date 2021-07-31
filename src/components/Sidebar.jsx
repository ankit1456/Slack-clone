import React from "react";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import SidebarOption from "./SidebarOption";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import AddIcon from "@material-ui/icons/Add";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../firebase";

const Sidebar = ({ setOpen }) => {
  const [user] = useAuthState(auth);
  const [channels, loading, error] = useCollection(db.collection("channels"));
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Code The Web HQ</h2>
          <p>
            <FiberManualRecordIcon />
            {user?.displayName}
          </p>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>

      <SidebarOption
        setOpen={setOpen}
        Icon={InsertCommentIcon}
        title='Threads'
      />
      <SidebarOption
        setOpen={setOpen}
        Icon={InboxIcon}
        title='Mention & reactions'
      />
      <SidebarOption setOpen={setOpen} Icon={DraftsIcon} title='Saved items' />
      <SidebarOption
        setOpen={setOpen}
        Icon={BookmarkBorderIcon}
        title='Channel browser'
      />
      <SidebarOption
        setOpen={setOpen}
        Icon={PeopleAltIcon}
        title='People & user groups'
      />
      <SidebarOption setOpen={setOpen} Icon={AppsIcon} title='Apps' />
      <SidebarOption
        setOpen={setOpen}
        Icon={FileCopyIcon}
        title='File browser'
      />
      <SidebarOption
        setOpen={setOpen}
        Icon={ExpandLessIcon}
        title='Show less'
      />

      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title='Channels' />
      <hr />
      <SidebarOption
        setOpen={setOpen}
        Icon={AddIcon}
        addChannelOtption
        title='Add Channel'
      />

      {channels?.docs.map((doc) => (
        <SidebarOption
          key={doc.id}
          id={doc.id}
          title={doc.data().channelName}
        />
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  color: #fff;
  background-color: var(--slack-color);
  flex: 0.3;
  border-top: 1px solid lightgray;
  max-width: 26rem;
  padding-top: 6rem;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 0.8rem;
  }

  ::-webkit-scrollbar-thumb {
    background: #915c94;
    border-radius: 8px;
  }
  > hr {
    border: 1px solid #49274b;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }
`;
const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 1.3rem;

  > .MuiSvgIcon-root {
    background-color: #fff;
    border-radius: 99rem;
    padding: 0.8rem;
    color: var(--slack-color);
    font-size: 3.5rem !important;
  }
`;
const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
  }

  > p {
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    margin-bottom: 0.5rem;

    > .MuiSvgIcon-root {
      color: green;
      font-size: 1.4rem;
      margin-top: 2px;
      margin-right: 2px;
    }
  }
`;
