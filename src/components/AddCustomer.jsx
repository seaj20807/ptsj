import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

export default function AddCustomer(props) {

    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }

    const addCustomer = () => {
        props.addCustomer(customer)
        handleClose()
    }

    return (
        <React.Fragment>
            <Button style={{ margin: 10 }} variant='outlined' onClick={handleClickOpen}>
                Add Customer
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
            >
                <DialogTitle id='alert-dialog-title'>
                    New Customer
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        name='firstname'
                        value={customer.firstname}
                        onChange={event => handleInputChange(event)}
                        label='First Name'
                        fullWidth
                        required
                    />
                    <TextField
                        margin='dense'
                        name='lastname'
                        value={customer.lastname}
                        onChange={event => handleInputChange(event)}
                        label='Last Name'
                        fullWidth
                        required
                    />
                    <TextField
                        margin='dense'
                        name='streetaddress'
                        value={customer.streetaddress}
                        onChange={event => handleInputChange(event)}
                        label='Street Address'
                        fullWidth
                    />
                    <TextField
                        margin='dense'
                        name='postcode'
                        value={customer.postcode}
                        onChange={event => handleInputChange(event)}
                        label='Postal Code'
                        fullWidth
                    />
                    <TextField
                        margin='dense'
                        name='city'
                        value={customer.city}
                        onChange={event => handleInputChange(event)}
                        label='City'
                        fullWidth
                    />
                    <TextField
                        margin='dense'
                        name='email'
                        value={customer.email}
                        onChange={event => handleInputChange(event)}
                        label='E-Mail'
                        fullWidth
                        required
                    />
                    <TextField
                        margin='dense'
                        name='phone'
                        value={customer.phone}
                        onChange={event => handleInputChange(event)}
                        label='Phone'
                        fullWidth
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addCustomer} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )

}