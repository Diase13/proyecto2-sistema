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
      setAlert(<Alert severity="success">Se prendio el Sensor</Alert>);
    } else {
      setAlert(<Alert severity="warning">Se apago el Sensor</Alert>);
    }

    // Desaparecer la alerta después de 5 segundos
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

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