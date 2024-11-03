import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Combobox, Option, ComboboxProps } from '@fluentui/react-combobox';
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import axios from "axios";

const Saque = () => {
  const [tipo, setTipo] = React.useState("");
  const [tipoSaque, setTipoSaque] = React.useState("");
  const [ComboJugadoras, setComboJugadoras] = useState<string[]>([]);
  const [selectedJugadora, setSelectedJugadora] = useState("");

  const handleChange = (event) => {
    setTipo(event.target.value);
  };

  const handleChangeSaque = (event) => {
    setTipoSaque(event.target.value);
  };

  const handleChangeJugadoras = (event) => {
    setSelectedJugadora(event.target.value);
  };

  useEffect(() => {
    // Fetch the player names from the API
    const fetchJugadorasNames = async () => {
      try {
        const response = await axios.get(`http://localhost:5166/api/jugadoras/ComboJugadoras`);
        setComboJugadoras(response.data);
      } catch (error) {
        console.error("Error fetching player names:", error);
      }
    };
    fetchJugadorasNames();
  }, []);

  return (
    <div style={{ padding: "100px"}}>
      <Stack spacing={8} direction="row">
        <div style={{ paddingTop: "15px" }}>Nivel de Entrenamiento:</div>
        <FormControl style={{minWidth: 600}}>
          <InputLabel id="demo-simple-select-label">Numero</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tipoSaque}
            label="Age"
            onChange={handleChangeSaque}
          >
            <MenuItem value={10}>Basico - 5 Saques</MenuItem>
            <MenuItem value={20}>Intermedio - 15 Saques</MenuItem>
            <MenuItem value={20}>Avanzado - 25 saques</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <br />
      <Stack spacing={8} direction="row">
        <div style={{ paddingTop: "15px" }}>Numero de Saque</div>
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
        <Button>Encender Sensor</Button>
      </Stack>
      <br />
      <Stack spacing={8} direction="row">
        <div style={{ paddingTop: "15px" }}>El sensor detecta: </div>
        <FormControl style={{minWidth: 200}}>
          <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tipo}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Afuera</MenuItem>
            <MenuItem value={20}>Dentro</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <br/>
      <Stack spacing={8} direction="row">
        <div style={{ paddingTop: "15px" }}>Jugadora:</div>
        <FormControl style={{minWidth: 600}}>
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
    </div>
  );
};

export default Saque;
