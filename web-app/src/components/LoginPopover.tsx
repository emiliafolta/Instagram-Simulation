import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./LoginPopover.css"
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useResource, useSolidAuth, useSubject } from "@ldo/solid-react";
import { SolidProfileShapeShapeType } from '../ldo/solidProfile.shapeTypes';
import { FunctionComponent, useEffect, useState } from 'react';
import { IUserProfile } from './common';


const LoginPopover: FunctionComponent<{ 
    userProfile: IUserProfile,
    setUserProfile: React.Dispatch<React.SetStateAction<IUserProfile>>
  }> = ({ userProfile, setUserProfile }) => {

  // Session information
  const { session, login, logout } = useSolidAuth();
  const webIdResource = useResource(session.webId);
  const profile = useSubject(SolidProfileShapeShapeType, session.webId);    

  // Popover
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    // set the user profile name 
    const profileName = webIdResource?.isReading()
    ? "LOADING..."
    : profile?.name
    ? profile.name
    : session.webId

    setUserProfile({
        ...userProfile,
        name: profileName
    })
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        <IconButton aria-label="log-in" onClick={handleClick}>
            <AccountCircleIcon className="homePageProfileButton"/>
        </IconButton>
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
        >
            {session.isLoggedIn ? (
                <Typography className='loginPopover'>
                    <Typography className='loginMessage'> 
                        <div>You are logged in as:</div>
                        <div>{userProfile.name}</div>
                    </Typography>
                    <Button className='loginButton' onClick={logout}>
                        <Typography>Log Out</Typography>
                        <LogoutIcon />
                    </Button>
                </Typography>
            ) : (
                <Typography className='loginPopover'>
                    <Typography className='loginMessage'>You are not logged in</Typography>
                    <Button
                        onClick={() => {
                            // Get the Solid issuer the user should log into
                            const issuer = prompt(
                            "Enter your Solid Issuer",
                            "https://solidweb.me"
                            );
                            if (!issuer) return;
                            login(issuer);
                        }}
                        className='loginButton'
                    >
                    <Typography>Log In</Typography>
                    <LoginIcon />
                    </Button>
                </Typography>
            )}
        </Popover>
    </div>
  );
}

export default LoginPopover;