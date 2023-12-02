import { useState, useEffect } from "react"
import { groupBy, sumBy } from "lodash"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function Statistics() {

    const [trainingsList, setTrainingsList] = useState([])
    const REST_URL = 'https://traineeapp.azurewebsites.net/gettrainings'
    let trainingsByActivity = []

    useEffect(() => getTrainingsList(), [])

    const getTrainingsList = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                setTrainingsList(responseData)
            })
            .catch(error => console.error(error))
    }

    const groupSumData = () => {
        let newList = groupBy(trainingsList, 'activity')
        for (let key of Object.keys(newList)) {
            newList[key].activity = key
            newList[key].durationSum = sumBy(newList[key], 'duration')
            trainingsByActivity.push(newList[key])
        }
    }

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
            {groupSumData()}
            <BarChart
                width={600}
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