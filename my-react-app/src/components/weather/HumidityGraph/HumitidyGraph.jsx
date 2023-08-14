import React from 'react';
import "./HumidityGraph.css";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    BarElement, CategoryScale, LinearScale, Tooltip, Legend
)
function HumidityGraph( humidity ) {
const humidityValue = humidity['humidity'];
console.log(humidityValue);
const data = {
    labels: ['Humidity'],
    datasets: [
        {
            label: 'humidity',
            data: [humidityValue],
            backgroundColor: 'rgba(156, 156, 156, 0.8)', // You can customize the color here
            borderColor: 'rgba(156, 156, 156, 1)',
            borderWidth: 1
        }
    ]
}

const options = {
    scales: {
        y: {
            beginAtZero: true,
            max: 100, // Set the maximum scale value to 100
            title: {
                display: false // Hide the Y-axis label
            },
            grid: {
                color: 'rgba(0, 0, 0, 1)' // Customize grid color
            }
        }
    },
    plugins: {
        legend: {
            display: false // Hide the legend
        }
    }
}

    return (
        <div>
            <div className = "humidity-bar-container">
                <Bar className="humidity-bar"
                    style = {
                        {width: '5rem'}
                    }
                    data = {data}
                    options = {options}
                ></Bar>
            </div>
        </div>
    );
};

export default HumidityGraph;
