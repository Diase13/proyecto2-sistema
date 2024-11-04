import React, { useEffect, useRef } from 'react';
import { Box, Card } from '@mui/material';
import {
  Chart,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  PolarAreaController,
} from 'chart.js';

Chart.register(PolarAreaController, RadialLinearScale, ArcElement, Tooltip, Legend);

const Home: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const myChartRef = useRef<Chart<'polarArea', number[], string> | null>(null); 
  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return; 

    if (myChartRef.current) {
      myChartRef.current.destroy(); 
    }

    const data: ChartData<'polarArea', number[], string> = {
      labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
      datasets: [
        {
          label: 'Cantidad Jugadoras',
          data: [20, 30, 40, 50, 60],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(255, 205, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(54, 162, 235, 0.5)',
          ],
        },
      ],
    };

    const options: ChartOptions<'polarArea'> = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const, 
        },
        title: {
          display: true,
          text: 'Polar Area Chart',
        },
      },
    };

    myChartRef.current = new Chart(ctx, {
      type: 'polarArea',
      data: data,
      options: options,
    });

    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ padding: '10px' }}>
      <h2>Home Page</h2>
      <Box sx={{ maxWidth: '600px' }}>
        <Card variant="outlined">
          <canvas
            ref={chartRef}
            style={{ width: '100%', height: '400px' }} 
          />
        </Card>
      </Box>
    </div>
  );
};

export default Home;