import { Box, IconButton } from "@mui/material"
import "./HomePage.css"
import { useState } from "react";
import SettingsDialog from "./SettingsDialog";
// import icons
import MenuIcon from '@mui/icons-material/Menu';
import { useSolidAuth } from "@ldo/solid-react";
import LoginPopover from "./Popover";


const Header = () => {
  const { session, login, logout } = useSolidAuth();

  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false)
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)

  const handleSettingsDialogClose = () => {
    setSettingsDialogOpen(false)
  }

  const handleLoginDialogClose = () => {
    setSettingsDialogOpen(false)
  }

  return (
    <header>
       <Box className="homePageTopBar">
        <IconButton aria-label="settings" onClick={() => {setSettingsDialogOpen(true)}}>
            <MenuIcon className="homePageMenuButton" />
        </IconButton>
        <SettingsDialog open={settingsDialogOpen} onClose={handleSettingsDialogClose} />
        <LoginPopover/>
      </Box>     
    </header>
  );
};

export default Header;