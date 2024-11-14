import React, { useEffect, useState } from "react";
import {
  Button,
  Stack,
  IconButton,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Card,
  CardContent,
  Grid,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import axios from "axios";

interface ComboItem {
  tipoEntrenamientoID: number;
  nombreDescripcion: string;
}

interface Entrenamiento {
  entrnamientoEspecificoID: number;
  nombre: string;
  description: string;
  tipoEntrenamientoID: number;
  tipoEntrenamiento: null | string; // Puede ser null o algún tipo de valor adicional si la API lo tiene
}

const Saque = () => {
  const [tipo, setTipo] = React.useState<string>("");
  const [ComboJugadoras, setComboJugadoras] = useState<string[]>([]);
  const [ComboNumero, setComboNumero] = useState<ComboItem[]>([]);
  const [selectedJugadora, setSelectedJugadora] = useState<string>("");
  const [selectedNumero, setSelectedNumero] = useState<string>("");
  const [entrenamientos, setEntrenamientos] = useState<Entrenamiento[]>([]); // Cambio aquí para manejar una lista de entrenamientos

  const handleChange = (event: SelectChangeEvent<string>) => {
    setTipo(event.target.value);
  };

  const handleChangeSaque = (event: SelectChangeEvent<string>) => {
    setSelectedNumero(event.target.value);
  };

  const handleChangeJugadoras = (event: SelectChangeEvent<string>) => {
    setSelectedJugadora(event.target.value);
  };

  // useEffect para cargar ComboNumero (Nivel de Entrenamiento)
  useEffect(() => {
    const fetchEntrenamientoCombo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5166/api/tipoEntrenamiento/ComboEntrenamiento`
        );
        setComboNumero(response.data);
      } catch (error) {
        console.error("Error fetching training data:", error);
      }
    };
    fetchEntrenamientoCombo();
  }, []);

  useEffect(() => {
    const fetchJugadorasCombo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5166/api/jugadoras/ComboJugadoras`
        );
        setComboJugadoras(response.data);
      } catch (error) {
        console.error("Error fetching training data:", error);
      }
    };
    fetchJugadorasCombo();
  }, []);

  // useEffect para cargar los detalles de los entrenamientos específicos cuando el número cambie
  useEffect(() => {
    if (selectedNumero) {
      const fetchEntrenamientoEspecifico = async () => {
        try {
          // Realiza la solicitud con el ID seleccionado
          const response = await axios.get(
            `http://localhost:5166/api/tipoEntrenamiento/BuscarEntrenamientoEspecifico/${selectedNumero}`
          );
          setEntrenamientos(response.data); // Guarda la lista de entrenamientos
        } catch (error) {
          console.error("Error fetching specific training data:", error);
        }
      };
      fetchEntrenamientoEspecifico();
    }
  }, [selectedNumero]); // Dependencia: cada vez que selectedNumero cambie

  return (
    <div style={{ padding: "100px" }}>
      <Grid container spacing={2}>
        {/* Columna Izquierda */}
        <Grid item xs={12} md={6}>
          <Stack spacing={4} direction="column">
            <Stack spacing={2} direction="column">
              <Typography variant="body1" style={{ paddingTop: "15px" }}>
                Nivel de exigencia en el Entrenamiento:
              </Typography>
              <FormControl style={{ minWidth: 450 }}>
                <InputLabel id="jugadora-select-label">Número</InputLabel>
                <Select
                  labelId="jugadora-select-label"
                  id="demo-simple-select"
                  value={selectedNumero}
                  label="Nivel de Entrenamiento"
                  onChange={handleChangeSaque}
                >
                  {ComboNumero.map((item) => (
                    <MenuItem
                      key={item.tipoEntrenamientoID}
                      value={item.tipoEntrenamientoID.toString()} // Convertir a string
                    >
                      {item.nombreDescripcion}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Stack spacing={2} direction="column">
              <Typography variant="body1" style={{ paddingTop: "15px" }}>
                Número de Saque
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton aria-label="delete">
                  <SportsVolleyballIcon />
                </IconButton>
                <IconButton aria-label="delete">
                  <SportsVolleyballIcon />
                </IconButton>
                <IconButton aria-label="delete">
                  <SportsVolleyballIcon />
                </IconButton>
                <IconButton aria-label="delete">
                  <SportsVolleyballIcon />
                </IconButton>
              </Stack>
            </Stack>

            <Stack spacing={2} direction="column">
              <Typography variant="body1" style={{ paddingTop: "15px" }}>
                El sensor detecta:
              </Typography>
              <FormControl style={{ minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tipo}
                  label="Tipo"
                  onChange={handleChange}
                >
                  <MenuItem value="10">Afuera</MenuItem>
                  <MenuItem value="20">Dentro</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <Stack spacing={2} direction="column">
              <Typography variant="body1" style={{ paddingTop: "15px" }}>
                Jugadora:
              </Typography>
              <FormControl style={{ minWidth: 600 }}>
                <InputLabel id="jugadora-select-label">Jugadora</InputLabel>
                <Select
                  labelId="jugadora-select-label"
                  id="jugadora-select"
                  value={selectedJugadora}
                  label="Jugadora"
                  onChange={handleChangeJugadoras}
                >
                  {ComboJugadoras.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button>Guardar Entrenamiento</Button>
            </Stack>
          </Stack>
        </Grid>

        {/* Columna Derecha - Card que se muestra al seleccionar un Nivel de Entrenamiento */}
        <Grid item xs={12} md={6}>
          {selectedNumero && entrenamientos.length > 0 && (
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Detalles del Entrenamiento:</Typography>
                {entrenamientos.map((entrenamiento) => (
                  <div key={entrenamiento.entrnamientoEspecificoID}>
                    <Typography variant="body1">Nombre: {entrenamiento.nombre}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Descripción: {entrenamiento.description}
                    </Typography>
                    <hr />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Saque;