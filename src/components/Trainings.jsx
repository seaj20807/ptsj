import { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { Snackbar } from '@mui/material'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import dayjs from 'dayjs'
import DeleteTraining from './DeleteTraining'

export default function Trainings() {

    // Define the state variables and fetch URL for data to be shown.
    const [trainingsList, setTrainingsList] = useState([])
    const [msg, setMsg] = useState('')
    const [open, setOpen] = useState(false)
    const REST_URL = 'https://traineeapp.azurewebsites.net/gettrainings'

    // Perform the fetch on the first render.
    useEffect(() => getTrainingsList(), [])

    // Fetch the training data to be shown in AG Grid.
    const getTrainingsList = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                setTrainingsList(responseData)
            })
            .catch(error => console.error(error))
    }

    // Get the date (and time) data from the 'Date and Time' field and return it in the desired format.
    const getDateTime = (params) => {
        return (dayjs(params.data.date).format("DD.MM.YYYY, HH:mm"))
    }

    // Delete the training from the database.
    const deleteTraining = (trainingToDelete) => {
        fetch('https://traineeapp.azurewebsites.net/api/trainings/' + trainingToDelete.id, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    setMsg('Training was deleted successfully!')
                    setOpen(true)
                    getTrainingsList()
                } else {
                    setMsg('Training could not be deleted!')
                    setOpen(true)
                }
            })
            .catch(error => console.error(error))
    }

    // Define the AG Grid view columns and their data + Delete button (and its function).
    const columns = [
        {
            field: 'customer.firstname',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            field: 'customer.lastname',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            headerName: 'Date and Time',
            valueGetter: getDateTime,
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            field: 'duration',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            field: 'activity',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            cellRenderer: trainingToDelete =>
                <DeleteTraining deleteTraining={deleteTraining} trainingToDelete={trainingToDelete.data} />,
            width: 120
        }
    ]

    return (
        <>
            <div className='ag-theme-material'
                style={{ height: '700px', width: '100%', margin: 'auto' }}>
                <AgGridReact
                    rowData={trainingsList}
                    columnDefs={columns}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={msg}
            />
        </>
    )

}