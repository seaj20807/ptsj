import { useState, useEffect, useRef, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { Button, Snackbar } from '@mui/material'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import AddCustomer from './AddCustomer'
import EditCustomer from './EditCustomer'
import AddTraining from './AddTraining'
import DeleteCustomer from './DeleteCustomer'

export default function Customers() {

    // Define the state variables and fetch URL for data to be shown.
    const [customersList, setCustomersList] = useState([])
    const [msg, setMsg] = useState('')
    const [open, setOpen] = useState(false)
    const gridRef = useRef()
    const REST_URL = 'https://traineeapp.azurewebsites.net/api/customers'

    useEffect(() => getCustomersList(), [])

    // Fetch the customer data to be shown in AG Grid.
    const getCustomersList = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                setCustomersList(responseData.content)
            })
            .catch(error => console.error(error))
    }

    // Function for adding a customer and showing a Snackbar message on success or failure.
    const addCustomer = (newCustomer) => {
        fetch(REST_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
            .then(response => {
                if (response.ok) {
                    setMsg('Customer was added successfully!')
                    setOpen(true)
                    getCustomersList()
                } else {
                    setMsg('Customer could not be added!')
                    setOpen(true)
                }
            })
            .catch(error => console.error(error))
    }

    // Function for editing a customer and showing a Snackbar message on success or failure.
    const editCustomer = (editedCustomer, customerToEdit) => {
        fetch(customerToEdit, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedCustomer)
        })
            .then(response => {
                if (response.ok) {
                    setMsg('Customer was edited successfully!')
                    setOpen(true)
                    getCustomersList()
                } else {
                    setMsg('Customer could not be edited!')
                    setOpen(true)
                }
            })
            .catch(error => console.error(error))
    }

    // Function for deleting a customer and showing a Snackbar message on success or failure.
    const deleteCustomer = (customerToDelete) => {
        fetch(customerToDelete.links[0].href, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    setMsg('Customer was deleted successfully!')
                    setOpen(true)
                    getCustomersList()
                } else {
                    setMsg('Customer could not be deleted!')
                    setOpen(true)
                }
            })
            .catch(error => console.error(error))
    }

    // Function for adding a training to a customer and showing a Snackbar message on success or failure.
    const addTraining = (newTraining) => {
        fetch('https://traineeapp.azurewebsites.net/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTraining)
        })
            .then(response => {
                if (response.ok) {
                    setMsg('Training was added successfully!')
                    setOpen(true)
                    getCustomersList()
                } else {
                    setMsg('Training could not be added!')
                    setOpen(true)
                }
            })
            .catch(error => console.error(error))
    }

    // Define which columns to export in case of a CSV export.    
    const getParams = () => {
        return {
            columnKeys: [
                'firstname',
                'lastname',
                'streetaddress',
                'postcode',
                'city',
                'email',
                'phone'
            ]
        }
    }

    // Export customer data as CSV.
    const exportCustomers = useCallback(() => {
        let params = getParams()
        gridRef.current.exportDataAsCsv(params)
    }, [])

    // Define the AG Grid view columns and their data + Edit and Delete buttons (and their functions).
    const columns = [
        {
            field: 'firstname',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            field: 'lastname',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            field: 'streetaddress',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            field: 'postcode',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            field: 'city',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            field: 'email',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            field: 'phone',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            cellRenderer: customerToEdit =>
                <EditCustomer saveCustomer={editCustomer} customerToEdit={customerToEdit.data} />,
            width: 120
        },
        {
            cellRenderer: customerToDelete =>
                <DeleteCustomer deleteCustomer={deleteCustomer} customerToDelete={customerToDelete.data} />,
            width: 120
        }
    ]

    return (
        <>
            <AddCustomer addCustomer={addCustomer} />
            <AddTraining addTraining={addTraining} gridRef={gridRef} />
            <Button style={{ margin: 10 }} variant='outlined' onClick={exportCustomers}>
                Export Customer Data
            </Button>
            <div className='ag-theme-material'
                style={{ height: '700px', width: '100%', margin: 'auto' }}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowSelection='single'
                    rowData={customersList}
                    columnDefs={columns}
                />
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg}
                />
            </div>
        </>
    )

}