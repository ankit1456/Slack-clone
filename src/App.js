import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import styled from "styled-components";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./components/Login";
import Spinner from "react-spinkit";

function App() {
  const [user, loading, error] = useAuthState(auth);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const [open, setOpen] = useState(true);

  if (loading) {
    return (
      <Loading>
        <LoadingContent>
          <img
            src='https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg'
            alt=''
          />
          <Spinner name='ball-spin-fade-loader' color='purple' fadeIn='none' />
        </LoadingContent>
      </Loading>
    );
  }
  return (
    <div className='app'>
      <Router>
        {user ? (
          <>
            <Header />
            <AppBody>
              <Switch>
                <Route exact path='/'>
                  {matches ? (
                    <Swipeabledrawer
                      anchor='left'
                      open={open}
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                    >
                      <Sidebar setOpen={setOpen} />
                    </Swipeabledrawer>
                  ) : (
                    <Sidebar />
                  )}
                  <Chat />
                </Route>
              </Switch>
            </AppBody>
          </>
        ) : (
          <Login />
        )}
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
const Swipeabledrawer = styled(SwipeableDrawer)`
  > .MuiDrawer-paper {
    height: unset;
  }
`;

const Loading = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100vh;
`;
const LoadingContent = styled.div`
  text-align: center;
  padding-bottom: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 20rem;
    padding: 2rem;
    margin-bottom: 6rem;
  }
`;
