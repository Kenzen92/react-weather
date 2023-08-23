import React from 'react';
import "./HumidityGraph.css";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    BarElement, CategoryScale, LinearScale, Tooltip, Legend
)
function HumidityGraph( humidity ) {
const humidityValue = humidity['humidity'];
const data = {
    labels: ['Humidity'],
    datasets: [
        {
            label: 'humidity',
            data: [humidityValue],
            backgroundColor: 'rgba(256, 256, 256, 0.8)', // You can customize the color here
            borderColor: 'rgba(156, 156, 156, 1)',
            borderWidth: 1,
            barPercentage: 1
        }
    ]
}


  const options = {
    aspectRatio: 0.5, // Adjust this value as needed for your desired aspect ratio
    scales: {
        y: {
            beginAtZero: true,
            max: 100,
            title: {
                display: false
            },
            grid: {
                color: 'rgba(256, 256, 256, 0.8)'
            },
            ticks: {
                color: 'rgba(256, 256, 256, 0.8)' // Customize the color of the y-axis ticks
            }
        },
        x: {
            ticks: {
                color: 'rgba(256, 256, 256, 0.8)'
            }
        }
    },
    plugins: {
        legend: {
            display: false
        },
        beforeDraw: (chart, args, options) => {
            const { ctx } = chart;
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = options.customCanvasBackgroundColor.color || '#99ffff';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        }
    }
};

    return (
        <div>
            <div className = "humidity-bar-container">
                <Bar className="humidity-bar"
                    data = {data}
                    options = {options}
                ></Bar>
            </div>
        </div>
    );
};

export default HumidityGraph;
