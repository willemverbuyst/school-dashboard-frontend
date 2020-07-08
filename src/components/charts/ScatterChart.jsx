import React from 'react';
import { Scatter } from 'react-chartjs-2';

export default function ScatterChart({ data, color, title }) {
  const chartData = {
    labels: { display: false },
    datasets: [
      {
        label: { display: false },
        data: data,
        backgroundColor: color,
        borderWidth: 0,
        pointRadius: 5,
      },
    ],
  };

  return (
    <Scatter
      data={chartData}
      options={{
        tooltips: false,
        legend: {
          display: false,
        },
        responsive: true,
        title: { text: title, display: true, padding: 15, fontSize: 14 },
        scales: {
          yAxes: [
            {
              ticks: {
                autoSkip: true,
                beginAtZero: true,
                stepSize: 1,
              },
              gridLines: {
                display: false,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              type: 'time',
              time: { parser: 'YYYY/MM/DD HH:mm:ss' },
            },
          ],
        },
      }}
    />
  );
}
