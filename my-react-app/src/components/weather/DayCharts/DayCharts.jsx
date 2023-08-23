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
    const hourLabels = dayWeatherHours.map(hour => hour['datetime'].slice(0, -3));
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
                backgroundColor: 'rgba(255, 165, 0, 0.2)',
                fill: true,
                tension: 0.3
            },
            {
                label: 'Temperature',
                data: tempData,
                borderColor: 'red',
                backgroundColor: 'rgba(255, 165, 0, 0.2)',
                fill: true,
                tension: 0.3
            },
            {
                label: 'Precipitation Chance',
                data: precipitationData,
                borderColor: 'blue',
                backgroundColor: 'rgba(255, 165, 0, 0.2)',
                fill: true,
                tension: 0.3

            },
            {
                label: 'UV Index',
                data: uvIndexData,
                borderColor: 'yellow',
                backgroundColor: 'rgba(255, 165, 0, 0.2)',
                fill: true,
                tension: 0.3
            }
        ]
    };


    const options = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 0.5,
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
