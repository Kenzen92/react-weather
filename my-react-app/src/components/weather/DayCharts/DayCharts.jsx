import React from 'react';
import "./DayCharts.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function DayGraph({ dayWeather }) {
    const dayWeatherHours = dayWeather['hours'];
    const hourLabels = dayWeatherHours.map(hour => hour['datetime'].slice(0, -3));
    const humidityData = dayWeatherHours.map(hour => hour['humidity']);
    const precipitationData = dayWeatherHours.map(hour => hour['precipprob']);
    const uvIndexData = dayWeatherHours.map(hour => (hour['uvindex'] / 10) * 100); // Convert 0-10 scale to 0-100

    const data = {
        labels: hourLabels,
        datasets: [
            {
                label: 'Humidity',
                data: humidityData,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                fill: true,

            },
            {
                label: 'Precipitation Chance',
                data: precipitationData,
                borderColor: 'green',
                backgroundColor: 'rgba(0, 255, 0, 0.2)',
                fill: true,

            },
            {
                label: 'UV Risk',
                data: uvIndexData,
                borderColor: 'orange',
                backgroundColor: 'rgba(255, 165, 0, 0.2)',
                fill: true,
            }
        ]
    };


    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'rgba(256, 256, 256, 0.8)' // Set the desired color for the legend text
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time of Day',
                    color: 'rgba(256, 256, 256, 0.8)'
                },
                grid: {
                    color: 'rgba(256, 256, 256, 0.2)'
                },
                ticks: {
                    color: 'rgba(256, 256, 256, 0.6)' // Customize the color of the y-axis ticks
                }
            },
            y: {
                display: true,
                color: 'rgba(256, 256, 256, 0.8)',
                grid: {
                    color: 'rgba(256, 256, 256, 0.2)'
                },
                ticks: {
                    color: 'rgba(256, 256, 256, 0.6)' // Customize the color of the y-axis ticks
                }
            }
        }
    };
    

    return (
        <div>
            <div className = "day-line-container">
                <Line className="humidity-Line"
                    data = {data}
                    options = {options}
                ></Line>
            </div>
        </div>
    );

}

export default DayGraph;
