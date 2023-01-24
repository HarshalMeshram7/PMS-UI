import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteDialog({open,handleClose,handleDelete,ID,name,...rest}) {

    return (
        <div>
        <Dialog 
          fullWidth
          maxWidth="xs"
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle align='center' id="alert-dialog-title">
            Delete {name}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {name} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions align="center">
            <Button onClick={handleClose} autoFocus>Cancel</Button>
            <Button style={{backgroundColor: 'red', color: '#FFFFFF'}} variant='contained' onClick={()=>{handleDelete(ID)}} >
            Delete
            </Button>
          </DialogActions>
        </Dialog>
        </div>
  )
}
