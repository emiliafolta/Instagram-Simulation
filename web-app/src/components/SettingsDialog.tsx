import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';

interface SettingsDialogProps {
    open: boolean
    onClose: () => void
}

const SettingsDialog: FC<SettingsDialogProps> = ({open, onClose}) => {

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
            Dialog
        </DialogTitle>
        <Typography >Type type type</Typography>
        <DialogContent className="settings-dialog-container">
           Content content content
        </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;
