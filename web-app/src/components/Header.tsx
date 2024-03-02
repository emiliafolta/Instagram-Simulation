import { Box, IconButton } from "@mui/material"
import "./HomePage.css"
import { FunctionComponent, useEffect, useState } from "react";
import SettingsDialog from "./SettingsDialog";
// import icons
import MenuIcon from '@mui/icons-material/Menu';
import LoginPopover from "./LoginPopover";
import { ISessionInfo } from "@inrupt/solid-client-authn-browser";
import { IUserProfile } from "./common";

const Header: FunctionComponent<{
  userProfile: IUserProfile,
  setUserProfile: React.Dispatch<React.SetStateAction<IUserProfile>>
}> = ({ userProfile, setUserProfile }) => {

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
        <SettingsDialog open={settingsDialogOpen} onClose={handleSettingsDialogClose} userProfile={userProfile} setUserProfile={setUserProfile}/>
        <LoginPopover userProfile={userProfile} setUserProfile={setUserProfile}/>
      </Box>
    </header>
  );
};

export default Header;