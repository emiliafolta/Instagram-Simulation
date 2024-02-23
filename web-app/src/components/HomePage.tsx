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
import { useEffect, useState } from "react";

const HomePage = () => {
  useEffect(() => {
    console.log("fetching time")
    fetch(config.BACKEND_BASE_URL + "/time").then(res => res.json()).then(data => {
      console.log(data)
    });
  }, []);
  
  const [sessionInfo, setSessionInfo] = useState<ISessionInfo | undefined>();
  useEffect(() => {
    handleIncomingRedirect().then((sessionInfo) => {
      setSessionInfo(sessionInfo);
    });
  }, []);

  return (
    <Box>
      <Header sessionInfo={sessionInfo}/>
      <Box className="feedContainer">
        <Feed />
      </Box>
    </Box>
    )

  };
  
export default HomePage;