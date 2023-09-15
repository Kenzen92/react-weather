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

function DayGraph({ dayWeather, windowWidth }) {
    const dayWeatherHours = dayWeather['hours'];
    const hourLabels = dayWeatherHours.map(hour => hour['datetime'].slice(0, -6));
    const humidityData = dayWeatherHours.map(hour => hour['humidity']);
    const tempData = dayWeatherHours.map(hour => hour['temp']);
    const precipitationData = dayWeatherHours.map(hour => hour['precipprob']);
    const uvIndexData = dayWeatherHours.map(hour => (hour['uvindex'] / 10) * 100); // Convert 0-10 scale to 0-100

    const data = {
        labels: hourLabels,
        datasets: [
            {
                label: 'Humidity',
                data: humidityData,
                borderColor: 'grey',
                backgroundColor: 'grey',
                tension: 0.5,
            },
            {
                label: 'Temperature',
                data: tempData,
                borderColor: 'red',
                backgroundColor: 'red',
                tension: 0.3
            },
            {
                label: 'Precipitation Chance',
                data: precipitationData,
                borderColor: 'blue',
                backgroundColor: 'blue',
                tension: 0.3

            },
            {
                label: 'UV Index',
                data: uvIndexData,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                tension: 0.3
            }
        ]
    };


    const options = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 0.5,
        pointRadius: 2,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'rgba(256, 256, 256, 1)' // Set the desired color for the legend text
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: false,
                },
                grid: {
                    color: 'rgba(256, 256, 256, 0.1)'
                },
                ticks: {
                    color: 'rgba(256, 256, 256, 0.6)', // Customize the color of the x-axis ticks
                    maxRotation: 0,
                    minRotation: 0
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
