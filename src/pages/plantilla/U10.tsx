import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const columns: GridColDef[] = [
    { field: 'jugadoraID', headerName: 'ID', width: 70 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'dni', headerName: 'DNI', width: 130 },
    { field: 'fechaNacimiento', headerName: 'Fecha de Nacimiento', width: 160 },
    { field: 'direccion', headerName: 'Dirección', width: 200 },
    { field: 'posicionJuego', headerName: 'Posición', width: 130 },
    { field: 'categoriaNombre', headerName: 'Categoria', width: 130 },
];

const U10 = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<number>(0); // Maneja el valor de la pestaña seleccionada con un entero

  const fetchJugadoras = async (categoriaId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5166/api/jugadoras/${categoriaId}`);
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching jugadoras:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const categoriaId = (selectedTab + 1).toString();
    fetchJugadoras(categoriaId);
  }, [selectedTab]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div style={{ padding: "10px" }}>
      <h2>Jugadoras</h2>
      
      {/* Tabs para cambiar entre categorías */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Categorías de Jugadoras">
          <Tab label="U10" />
          <Tab label="U11" />
          <Tab label="U12" />
          <Tab label="U13" />
          <Tab label="U15" />
          <Tab label="U17" />
          <Tab label="U19" />
        </Tabs>
      </Box>

      {/* Tabla para mostrar las jugadoras */}
      <Paper sx={{ height: 400, width: '100%', marginTop: '20px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.jugadoraID}
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
};

export default U10;
