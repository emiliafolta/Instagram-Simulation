import { Box, IconButton, Typography } from "@mui/material"
import "./HomePage.css"
import { FunctionComponent, useEffect, useState } from "react";
import SettingsDialog from "./SettingsDialog";
// import icons
import MenuIcon from '@mui/icons-material/Menu';
import LoginPopover from "./LoginPopover";
import { ISessionInfo } from "@inrupt/solid-client-authn-browser";
import { IUserProfile, UserGender } from "./common";

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
      <Box className="algorithmIndicator">
        <Typography className={!(userProfile.location || (userProfile.gender && userProfile.gender != UserGender.NOT_SPECIFIED) || userProfile.age || (userProfile.selectedCategories.length > 0) || (userProfile.allowLearning)) ? "selected" : "disabled"}>
          random
        </Typography>
        <Typography className={(userProfile.selectedCategories.length > 0) ? "selected" : "disabled"}>
          interests
        </Typography>
        <Typography className={(userProfile.location || (userProfile.gender && userProfile.gender != UserGender.NOT_SPECIFIED) || userProfile.age) ? "selected" : "disabled"}>
          details
        </Typography>
        <Typography className={(userProfile.allowLearning) ? "selected" : "disabled"}>
          interactions
        </Typography>
      </Box>
    </header>
  );
};

export default Header;