import { Typography, OutlinedInput, Button, Box, IconButton } from "@mui/material"
import { IUser } from "./common";
import Post from "./Post";
import "./HomePage.css"
import { useState } from "react";
import { Link } from "react-router-dom";
import SettingsDialog from "./SettingsDialog";
// import icons
import HomeIcon from '@mui/icons-material/Home';


const exampleUser: IUser = {id: 0, name:"cat0", image:"url"}

const ProfilePage = () => {

  return (
    <Box>
      <IconButton aria-label="home" component={Link} to={"/"}>
          <HomeIcon />
      </IconButton>
    </Box>
    )

  };
  
export default ProfilePage;