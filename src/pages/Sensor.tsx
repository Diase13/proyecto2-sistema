import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Sensor = () => {
  const [switchState, setSwitchState] = useState(false); // Estado del switch (On/Off)
  const [alert, setAlert] = useState<React.ReactElement | null>(null);
  const [squareColor, setSquareColor] = useState('black'); // Estado para el color del cuadrado
  const [intervalId, setIntervalId] = useState<number | null>(null); // Guardar el ID del intervalo

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 40,
    height: 20,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 18,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(20px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(20px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 16,
      height: 16,
      borderRadius: 8,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 20 / 2,
      opacity: 1,
      backgroundColor: 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));

  const handleSwitchChange = (event) => {
    const isChecked = event.target.checked;
    setSwitchState(isChecked);

    // Mostrar la alerta correspondiente
    if (isChecked) {
      setAlert(<Alert severity="success">Se prendió el Sensor</Alert>);

      // Iniciar el intervalo que cambia el color cada 5 minutos
      const id = window.setInterval(() => {
        // Cambiar a verde por 5 segundos y luego volver a negro
        setSquareColor('green');
        setTimeout(() => {
          setSquareColor('black');
        }, 3000);
      }, 3000); // Cambiar a 3 segundos para pruebas (luego se puede cambiar a 300000 para 5 minutos)

      setIntervalId(id); // Guardar el ID del intervalo
    } else {
      setAlert(<Alert severity="warning">Se apagó el Sensor</Alert>);

      // Limpiar el intervalo si el switch se apaga
      if (intervalId) {
        window.clearInterval(intervalId);
        setIntervalId(null);
      }
      setSquareColor('black'); // Asegurarse de que el cuadrado vuelva a negro
    }

    // Desaparecer la alerta después de 5 segundos
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  // Limpiar el intervalo cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div style={{ padding: '10px' }}>
      <h2>Sensor - Laser</h2>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid black', // Borde del botón
          borderRadius: '8px', // Bordes redondeados
          padding: '10px', // Espaciado interno
          width: '150px', // Ancho del rectángulo
          backgroundColor: '#f5f5f5', // Color de fondo
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Off</Typography>
          <AntSwitch checked={switchState} onChange={handleSwitchChange} />
          <Typography>On</Typography>
        </Stack>
      </Box>

      {/* Cuadrado que cambia de color */}
      <Box
        sx={{
          marginTop: '20px',
          width: '100px',
          height: '100px',
          backgroundColor: squareColor, // Cambiar el color basado en el estado
          border: '2px solid black',
        }}
      />

      {/* Mostrar alerta si está presente */}
      {alert && (
        <Box mt={2}> {/* Margen superior para separar la alerta */}
          {alert}
        </Box>
      )}
    </div>
  );
};

export default Sensor;
