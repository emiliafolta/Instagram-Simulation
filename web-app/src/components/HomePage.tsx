import { Box } from "@mui/material"
import "./HomePage.css"
import Feed from "./Feed";
import Header from "./Header";
import { useSolidAuth } from "@ldo/solid-react";
import config from "./config"

import {
  handleIncomingRedirect,
  ISessionInfo
} from '@inrupt/solid-client-authn-browser';
import { FunctionComponent, useEffect, useState } from "react";
import { IUserProfile } from "./common";

const HomePage: FunctionComponent<{
  userProfile: IUserProfile,
  setUserProfile: React.Dispatch<React.SetStateAction<IUserProfile>>
}> = ({ userProfile, setUserProfile}) => {

  return (
    <Box>
      <Header userProfile={userProfile} setUserProfile={setUserProfile}/>
      <Box className="feedContainer">
        <Feed userProfile={userProfile} setUserProfile={setUserProfile}/>
      </Box>
    </Box>
    )

  };
  
export default HomePage;