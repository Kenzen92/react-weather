import React from 'react';
import "./UVGraph.css"; // Make sure to create this CSS file
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    BarElement, CategoryScale, LinearScale, Tooltip, Legend
);

function UVGraph({ uvLevel, uvRisk }) {
    const uvLevelValue = uvLevel || 0;
    const uvRiskValue = uvRisk || 0;

    const data = {
        labels: ['UV Level', 'UV Risk'],
        datasets: [
            {
                label: 'UV Level',
                data: [uvLevelValue, uvRiskValue],
                backgroundColor: 'rgba(256, 256, 256, 0.8)', // Customize the color here
                borderColor: 'rgba(156, 156, 156, 1)',
                borderWidth: 1,
                barPercentage: 0.5 // Adjust this value as needed
            }
        ]
    };

    const options = {
        aspectRatio: 0.5, // Adjust this value as needed for your desired aspect ratio
        scales: {
            y: {
                beginAtZero: true,
                max: 10, // Set the appropriate max value for your data range
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
            <div className="uv-bar-container">
                <Bar className="uv-bar"
                    data={data}
                    options={options}
                ></Bar>
            </div>
        </div>
    );
};

export default UVGraph;
