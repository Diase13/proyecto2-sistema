import React, { useEffect, useRef, useState } from 'react';
import { Box, Card, Grid } from '@mui/material';
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
import { BarChart } from '@mui/x-charts/BarChart';

Chart.register(PolarAreaController, RadialLinearScale, ArcElement, Tooltip, Legend);

const Home: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const myChartRef = useRef<Chart<'polarArea', number[], string> | null>(null);

  const [barChartData, setBarChartData] = useState<number[]>([]); // Estado para almacenar los datos del BarChart
  const [barChartLabels, setBarChartLabels] = useState<string[]>([]); // Estado para almacenar las etiquetas del BarChart

  useEffect(() => {
    // Función para obtener los datos de la API para el gráfico polar
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5166/api/jugadoras/CantidadJugadoras');
        const data = await response.json();

        // Extracción de etiquetas y valores del JSON para el gráfico polar
        const labels = data.map((item: { categoriaNombre: string }) => item.categoriaNombre);
        const values = data.map((item: { cantidadJugadoras: number }) => item.cantidadJugadoras);

        // Crea el gráfico con los datos obtenidos
        createChart(labels, values);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Función para obtener los datos de la API para el gráfico de barras
    const fetchBarChartData = async () => {
      try {
        const response = await fetch('http://localhost:5166/api/jugadoras/JugadorasEntrenamientos');
        const data = await response.json();

        // Extracción de etiquetas y valores del JSON para el gráfico de barras
        const labels = data.map((item: { nombre: string }) => item.nombre);
        const values = data.map((item: { totalEntrenamientos: number }) => item.totalEntrenamientos);

        // Actualiza el estado con los datos para el BarChart
        setBarChartLabels(labels);
        setBarChartData(values);
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    fetchData(); // Llamada para obtener los datos para el gráfico polar
    fetchBarChartData(); // Llamada para obtener los datos para el gráfico de barras

    // Cleanup para destruir el gráfico cuando el componente se desmonte
    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, []);

  const createChart = (labels: string[], values: number[]) => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Destruye cualquier gráfico existente para evitar superposiciones
    if (myChartRef.current) {
      myChartRef.current.destroy();
    }

    const data: ChartData<'polarArea', number[], string> = {
      labels: labels,
      datasets: [
        {
          label: 'Cantidad de Jugadoras',
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(255, 205, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(201, 203, 207, 0.5)',
          ],
        },
      ],
    };

    const options: ChartOptions<'polarArea'> = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Cantidad de Jugadoras por Categoría',
        },
      },
    };

    myChartRef.current = new Chart(ctx, {
      type: 'polarArea',
      data: data,
      options: options,
    });
  };

  return (
    <div style={{ padding: '10px' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Card variant="outlined">
            <canvas
              ref={chartRef}
              width="600" // Ancho del canvas
              height="450" // Altura del canvas
              style={{ display: 'block', maxWidth: '100%', maxHeight: '100%' }}
            />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant="outlined">
            <BarChart
              width={800}
              height={450}
              series={[
                { data: barChartData, label: 'Entrenamientos por Jugadora', id: 'entrId' },
              ]}
              xAxis={[
                {
                  data: barChartLabels,
                  scaleType: 'band',
                },
              ]}
            />
          </Card>
        </Grid>
        <Grid item xs={6}>
          3
        </Grid>
        <Grid item xs={6}>
          4
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;