import { Box, IconButton } from "@mui/material"
import "./HomePage.css"
import { FunctionComponent, useEffect, useState } from "react";
import SettingsDialog from "./SettingsDialog";
// import icons
import MenuIcon from '@mui/icons-material/Menu';
import LoginPopover from "./LoginPopover";
import { ISessionInfo } from "@inrupt/solid-client-authn-browser";

const Header: FunctionComponent<{
  sessionInfo?: ISessionInfo
}> = ({ sessionInfo }) => {

  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false)

  const handleSettingsDialogClose = () => {
    setSettingsDialogOpen(false)
  }

  return (
    <header>
       <Box className="homePageTopBar">
        <IconButton aria-label="settings" onClick={() => {setSettingsDialogOpen(true)}}>
            <MenuIcon className="homePageMenuButton" />
        </IconButton>
        <SettingsDialog open={settingsDialogOpen} onClose={handleSettingsDialogClose} sessionInfo={sessionInfo}/>
        <LoginPopover/>
      </Box>     
    </header>
  );
};

export default Header;