import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

export default function AddCustomer(props) {

    // Define the state variables.
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
    })

    // Open the Dialog for editing an existing customer's data.
    const handleClickOpen = () => {
        setCustomer(props.customerToEdit)
        setOpen(true);
    };

    // Close the Dialog for editing an existing customer's data.
    const handleClose = () => {
        setOpen(false);
    };

    // Read the data from the input fields (TextField) and set them to the customer variable.
    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }

    // Save the new data for an existing customer.
    const saveCustomer = () => {
        console.log(props.customerToEdit)
        props.saveCustomer(customer, props.customerToEdit.links[0].href)
        handleClose()
    }

    return (
        <React.Fragment>
            <Button size='small' color='success' onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">
                    Edit Customer
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        value={customer.firstname}
                        onChange={event => handleInputChange(event)}
                        label="First Name"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="lastname"
                        value={customer.lastname}
                        onChange={event => handleInputChange(event)}
                        label="Last Name"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={event => handleInputChange(event)}
                        label="Street Address"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="postcode"
                        value={customer.postcode}
                        onChange={event => handleInputChange(event)}
                        label="Postal Code"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="city"
                        value={customer.city}
                        onChange={event => handleInputChange(event)}
                        label="City"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        value={customer.email}
                        onChange={event => handleInputChange(event)}
                        label="E-Mail"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        value={customer.phone}
                        onChange={event => handleInputChange(event)}
                        label="Phone"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={saveCustomer} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )

}