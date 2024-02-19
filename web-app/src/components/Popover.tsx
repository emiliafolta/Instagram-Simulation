import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSolidAuth } from "@ldo/solid-react";
import "./Popover.css"
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export default function LoginPopover() {
  const { session, login, logout } = useSolidAuth();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
                        <div>You are logged in with the webId:</div>
                        <div>{session.webId}.{" "}</div>  
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