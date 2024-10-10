import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Box, Grid } from "@mui/material";

const Challenge = ({ navigate }) => { // Recibe navigate como prop

    const handleCardClick = () => {
      navigate('/jugadoras'); // Redirige a la ruta deseada
    };

  return (
    <div style={{ padding: "10px" }}>
      <Grid
        container
        spacing={2}
        columns={16}
        style={{ paddingTop: "10%", paddingLeft: "15%" }}
      >
        <Grid item xs={8}>
          <Card sx={{ maxWidth: 345 }} onClick={handleCardClick}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
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
                    SENSOR
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
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
                    VCAM
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Challenge;
