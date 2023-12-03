import { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import dayjs from 'dayjs'

export default function Calendar() {

    // Define the state variables and fetch URL for data to be shown.
    const [trainingsList, setTrainingsList] = useState([])
    const REST_URL = 'https://traineeapp.azurewebsites.net/gettrainings'

    useEffect(() => getTrainingsList(), [])

    // Fetch the training data to be shown in FullCalendar.
    const getTrainingsList = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                setTrainingsList(responseData)
            })
            .catch(error => console.error(error))
    }

    // Add an ending date and time for a training to the training data.
    const updateList = () => {
        for (let i = 0; i < trainingsList.length; i++) {
            trainingsList[i].end = dayjs(trainingsList[i].date).add(trainingsList[i].duration, 'minutes').toDate().toISOString()
        }
    }

    // Define how the events are shown in FullCalendar.
    const renderEventContent = (eventInfo) => {
        return (
            <>
                <b>{
                    dayjs(eventInfo.event.start).format('HH:mm') + ' - ' +
                    dayjs(eventInfo.event.end).format('HH:mm')
                }</b><br />
                <i>{
                    eventInfo.event._def.extendedProps.activity + ' / ' +
                    eventInfo.event._def.extendedProps.customer.firstname + ' ' +
                    eventInfo.event._def.extendedProps.customer.lastname
                }</i>
            </>
        )
    }

    return (
        <>
            {/* Perform the update to the training data list. TODO: Find a better place to call the function? */}
            {updateList()}
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                initialView='timeGridWeek'
                events={trainingsList}
                eventContent={renderEventContent}
                headerToolbar={{
                    left: 'today, prev,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                }}
                buttonText={{
                    today: 'Today',
                    month: 'Month',
                    week: 'Week',
                    day: 'Day',
                    listWeek: 'Agenda'
                }}
                slotLabelFormat={{
                    hour: 'numeric',
                    minute: 'numeric',
                    meridiem: ' short'
                }}
                views={{
                    dayGridPlugin: {
                        dayHeaderFormat: {
                            dateStyle: 'full'
                        }
                    }
                }}
            />
        </>
    )

}
