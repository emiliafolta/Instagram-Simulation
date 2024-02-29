import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';
import { useSolidAuth } from "@ldo/solid-react";

import ProfilePanel from './ProfilePanel';
import { ISessionInfo } from "@inrupt/solid-client-authn-browser";
import config from './config';

interface SettingsDialogProps {
    open: boolean
    onClose: () => void
    sessionInfo?: ISessionInfo
}

const SettingsDialog: FC<SettingsDialogProps> = ({open, onClose, sessionInfo}) => {

  const paperProps = {
    minWidth: "40rem", 
    height: "32rem", 
    backgroundColor: "white", 
    padding: "0.5rem", 
    borderRadius: "1rem"
}

  return (
    <Dialog open={open} onClose={onClose} sx={{"& .MuiDialog-paper": paperProps}}>
        <DialogTitle className="settings-dialog-title" >
            Preferences and user details
        </DialogTitle>
        {(sessionInfo?.isLoggedIn && sessionInfo?.webId) 
          ?
            <ProfilePanel webId={sessionInfo.webId}/>
          :
            <DialogContent className="settings-dialog-container">
              Please log in to set your preferences and user details.
            </DialogContent>
        }
    </Dialog>
  );
}

export default SettingsDialog;
