import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { CSSProperties } from "react";
import StyleCard from "../components/styles/styleCard";

const StylesPage = () => {
  return (
    <Paper elevation={4} sx={{ p: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="h6">Styles</Typography>
        <Button variant="outlined" size="small">+ CREATE NEW</Button>
      </div>
      <Divider sx={{ mt: 1, mb: 1 }}/>
      <Grid
        container
        spacing={1}
      >
        <Grid item xs={12} sm={6} lg={4}>
           <StyleCard/>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
           <StyleCard/>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
           <StyleCard/>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
           <StyleCard/>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
           <StyleCard/>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
           <StyleCard/>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
           <StyleCard/>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
           <StyleCard/>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StylesPage;

// const root: CSSProperties = {
//   margin: 20,
// };


// TODO:
// Skapa huvudboxen, med runda hörn, skugga, title, sökfält, skapa ny knapp
// Skapa en scrollbar vy i denna box som visar styleCard's, rutan ska stå still och så scrollar man i den under "devider"  linje