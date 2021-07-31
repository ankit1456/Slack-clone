import React from "react";
import SendIcon from "@material-ui/icons/Send";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { withStyles } from "@material-ui/core/styles";
import { Tooltip } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const Header = () => {
  const [user] = useAuthState(auth);
  return (
    <HeaderContainer>
      <HeaderLeft>
        <LightTooltip title='logout'>
          <HeaderAvatar
            onClick={() => auth.signOut()}
            src={user?.photoURL}
            alt={user?.displayName}
          />
        </LightTooltip>

        <AccessTimeIcon style={{ fontSize: 24 }} />
      </HeaderLeft>
      <HeaderSearch>
        <SearchIcon />
        <input type='text' placeholder='Serch code the web' />
      </HeaderSearch>
      <HeaderRight>
        <HelpOutlineIcon style={{ fontSize: 24 }} />
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  color: #fff;
  background-color: var(--slack-color);
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 2rem;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 3rem;
  }
`;
const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;
const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  background-color: #421f44;
  text-align: center;
  display: flex;
  padding: 1rem 5rem;
  border-radius: 0.6rem;

  > input {
    background-color: transparent;
    border: none;
    color: #fff;
    min-width: 20vw;
    padding-left: 0.5rem;
    letter-spacing: 1px;
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 2rem;
  }
`;
