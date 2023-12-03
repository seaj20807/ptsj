import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function DeleteTraining(props) {

    // Define the state variables.
    const [open, setOpen] = useState(false)

    // Open the Dialog for delete confirmation.
    const handleClickOpen = () => {
        setOpen(true)
    }

    // Close the Dialog for delete confirmation.
    const handleClose = () => {
        setOpen(false)
    }

    // Delete the the training from the database.
    const deleteTraining = () => {
        props.deleteTraining(props.trainingToDelete)
        handleClose()
    }

    return (
        <React.Fragment>
            <Button size='small' color='error' onClick={handleClickOpen}>
                Delete
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    {'Are you sure you want to delete this training?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        {'This training (' + props.trainingToDelete.activity + ') for '
                            + props.trainingToDelete.customer.firstname + ' '
                            + props.trainingToDelete.customer.lastname + ' will be permanently deleted.'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={deleteTraining} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}