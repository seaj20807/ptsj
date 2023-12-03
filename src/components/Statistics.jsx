import { useState, useEffect } from "react"
import { groupBy, sumBy } from "lodash"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

export default function Statistics() {

    // Define the state variables, fetch URL for data to be shown and trainingsByActivity array to hold updated data. 
    // TODO: Find a better solution for storing the updated data (trainingsByActivity).
    const [trainingsList, setTrainingsList] = useState([])
    const REST_URL = 'https://traineeapp.azurewebsites.net/gettrainings'
    let trainingsByActivity = []

    useEffect(() => getTrainingsList(), [])

    // Fetch the training data to be shown in Recharts.
    const getTrainingsList = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                setTrainingsList(responseData)
            })
            .catch(error => console.error(error))
    }

    // Use Lodash's groupBy and sumBy functions to group (by activity) and sum (by duration) the training data and add them to the trainingsByActivity array.
    const groupSumData = () => {
        let newList = groupBy(trainingsList, 'activity')
        for (let key of Object.keys(newList)) {
            newList[key].activity = key
            newList[key].durationSum = sumBy(newList[key], 'duration')
            trainingsByActivity.push(newList[key])
        }
    }

    // Define the data to be shown on a BarChart mouse hover
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{label}</p>
                    <p className="label">Total minutes: {payload[0].value}</p>
                </div>
            )
        }
        return null
    }

    return (
        <>
            {/* Perform the update and migration of training data to trainingsByActivity. 
            TODO: Find a better place to call the function? */}
            {groupSumData()}
            <BarChart
                width={800}
                height={500}
                data={trainingsByActivity}
                margin={{
                    top: 20,
                    right: 20,
                    left: 10,
                    bottom: 5
                }}>
                <XAxis dataKey="activity" />
                <YAxis dataKey="durationSum" />
                <Tooltip content={<CustomTooltip />} />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="durationSum" fill="#8884d8" />
            </BarChart>
        </>
    )

}