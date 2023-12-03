import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function DeleteCustomer(props) {

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

    // Delete the customer from the database.
    const deleteCustomer = () => {
        props.deleteCustomer(props.customerToDelete)
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
                    {'Are you sure you want to delete this customer?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        {'This customer (' + props.customerToDelete.firstname + ' '
                            + props.customerToDelete.lastname + ') AND ALL THEIR ASSOCIATED TRAININGS will be permanently deleted.'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={deleteCustomer} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}