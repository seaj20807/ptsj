import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import dayjs from 'dayjs'
import { DateTimeField } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function AddTraining(props) {

    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '', duration: '', activity: '', customer: ''
    })
    const [customer, setCustomer] = React.useState({
        firstname: '', lastname: ''
    })

    const handleClickOpen = () => {
        if (props.gridRef.current.getSelectedNodes().length > 0) {
            setCustomer({
                ...customer,
                firstname: props.gridRef.current.getSelectedNodes()[0].data.firstname,
                lastname: props.gridRef.current.getSelectedNodes()[0].data.lastname
            })
            setTraining({
                ...training,
                customer: props.gridRef.current.getSelectedNodes()[0].data.links[0].href
            })
            setOpen(true)
        } else {
            alert('Select a customer first!')
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    }

    const handleDateChange = (newDate) => {
        setTraining({ ...training, date: newDate })
    }

    const addTraining = () => {
        props.addTraining(training)
        handleClose()
    }

    return (
        <React.Fragment>
            <Button style={{ margin: 10 }} variant="outlined" onClick={handleClickOpen}>
                Add Training
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
            >
                <DialogTitle id='alert-dialog-title'>
                    New Training
                </DialogTitle>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DialogContent components={['DateTimeField']}>
                        <TextField
                            margin='dense'
                            name='firstname'
                            value={customer.firstname}
                            label='First Name'
                            fullWidth
                        />
                        <TextField
                            margin='dense'
                            name='lastname'
                            value={customer.lastname}
                            label='Last Name'
                            fullWidth
                        />
                        <DateTimeField
                            margin='dense'
                            label='Date and Time'
                            name='date'
                            value={training.date}
                            onChange={newDate => handleDateChange(dayjs(newDate).toDate())}
                            format='DD.MM.YYYY, HH:mm'
                        />
                        <TextField
                            margin='dense'
                            label='Duration (minutes)'
                            name='duration'
                            type='number'
                            value={training.duration}
                            onChange={event => handleInputChange(event)}
                            fullWidth
                        />
                        <TextField
                            margin='dense'
                            name='activity'
                            value={training.activity}
                            onChange={event => handleInputChange(event)}
                            label='Activity'
                            fullWidth
                        />
                    </DialogContent>
                </LocalizationProvider>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addTraining} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )

}