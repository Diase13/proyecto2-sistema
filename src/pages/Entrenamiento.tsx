import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Box } from "@mui/material";

const Entrenamiento = ({ navigate }) => {

  const handleCardClick = () => {
    navigate('/saque'); // Redirige a la ruta deseada
  };

  return (
    <div style={{ padding: "50px" }}>
      <Card sx={{ maxWidth: 345 }} onClick={handleCardClick}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="/images/saque.jpg"
            alt="saque"
          />
          <CardContent>
            <Box
              sx={{
                backgroundColor: "black",
                padding: 1, // Espaciado interno para el texto
                textAlign: "center",
                width: "100%", // Asegura que el Box ocupe todo el ancho
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ color: "white" }} // Texto blanco
              >
                Saque
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default Entrenamiento;
