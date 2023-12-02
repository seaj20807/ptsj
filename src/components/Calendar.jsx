import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import dayjs from 'dayjs'

export default function Calendar() {

    const [trainingsList, setTrainingsList] = useState([])
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

    const updateList = () => {
        for (let i = 0; i < trainingsList.length; i++) {
            trainingsList[i].end = dayjs(trainingsList[i].date).add(trainingsList[i].duration, 'minutes').toDate().toISOString()
        }
    }

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
