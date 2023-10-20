import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {Pie} from "react-chartjs-2"
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({prediction}) => {
    const chartData = {
        labels : ["Sadness","Joy","Love","Anger","Fear","Surprice"],
        datasets : [
            {
                data : prediction,
                backgroundColor : [
                    "rgb(237, 125, 49)",
                    "rgb(142, 143, 250)",
                    "rgb(244, 206, 20)",
                    "rgb(223, 204, 251)",
                    "rgb(181, 203, 153)",
                    "EE9322"
                ],
            }
        ]
    }
    return (
    <div className='pieContainer'>
        <Pie
            data={chartData}
        />
    </div>
  )
}

export default PieChart