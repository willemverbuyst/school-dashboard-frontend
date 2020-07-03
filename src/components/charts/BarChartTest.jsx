import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function BarChartTest({ labels, data, color, title, max }) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: { display: false },
        data: data,
        backgroundColor: color,
        borderWidth: 0,
      },
    ],
  };

  return (
    <Bar
      data={chartData}
      options={{
        tooltips: false,
        legend: {
          display: false,
          labels: { fontSize: 16 },
        },
        responsive: true,
        title: { text: title, display: true },
        scales: {
          yAxes: [
            {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
                beginAtZero: true,
                display: false,
                suggestedMax: 20,
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
            },
          ],
        },
      }}
    />
  );
}
