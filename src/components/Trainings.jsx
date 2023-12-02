import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { Snackbar } from '@mui/material'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import dayjs from 'dayjs'
import DeleteTraining from './DeleteTraining'

export default function Trainings() {

    const [trainingsList, setTrainingsList] = useState([])
    const [msg, setMsg] = useState('')
    const [open, setOpen] = useState(false)
    const REST_URL = 'https://traineeapp.azurewebsites.net/gettrainings'

    useEffect(() => getTrainingsList(), [])

    const getTrainingsList = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                setTrainingsList(responseData)
            })
            .catch(error => console.error(error))
    }

    const getDateTime = (params) => {
        return (dayjs(params.data.date).format("DD.MM.YYYY, HH:MM"))
    }

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
                    alert('Something went wrong')
                }
            })
            .catch(error => console.error(error))
    }

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