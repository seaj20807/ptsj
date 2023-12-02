import './App.css'
import React, { useState } from 'react'
import { Tabs, Tab } from '@mui/material'
import Main from './components/Main'
import Customers from './components/Customers'
import Trainings from './components/Trainings'
import Calendar from './components/Calendar'
import Statistics from './components/Statistics'

export default function App() {

  const [renderedPage, setRenderedPage] = useState('main')

  const navigate = (event, renderedPage) => {
    setRenderedPage(renderedPage)
  }

  return (
    <div className='App'>
      <Tabs value={renderedPage} onChange={navigate}>
        <Tab value='main' label='Main Menu' />
        <Tab value='customers' label='Customers' />
        <Tab value='trainings' label='Trainings' />
        <Tab value='calendar' label='Calendar' />
        <Tab value='statistics' label='Statistics' />
      </Tabs>
      {renderedPage === 'main' && <Main />}
      {renderedPage === 'customers' && <Customers />}
      {renderedPage === 'trainings' && <Trainings />}
      {renderedPage === 'calendar' && <Calendar />}
      {renderedPage === 'statistics' && <Statistics />}
    </div>
  )
}
