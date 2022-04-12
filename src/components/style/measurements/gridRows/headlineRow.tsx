import { makeStyles, Grid, Box, useTheme, Typography } from "@mui/material";


function HeadlineRow() {
    const theme = useTheme();
    const sizeRange: string[] = ['XS', 'S', 'M', 'L', 'XL'];
    return (
      <Grid
        container
        item
        md={12}
        lg={12}
        spacing={0}
        style={{ borderBottom: `1px solid ${theme.palette.primary.light}`, minWidth: '14rem' }}
      >
        <Grid item  sx={{minWidth: '2rem'}}>
          <Box sx={{fontWeight: "bold", background: theme.palette.info.light, border: `1px solid ${theme.palette.info.dark}` }} textAlign="left">
            o
          </Box>
        </Grid>
        <Grid item  sx={{minWidth: '5rem'}}>
          <Box sx={{fontWeight: "bold", background: theme.palette.info.light, border: `1px solid ${theme.palette.info.dark}`}} textAlign="left">
            Measurement Point
          </Box>
        </Grid>
        <Grid item sx={{minWidth: '1rem'}}>
          <Box sx={{fontWeight: "bold", background: theme.palette.info.light, border: `1px solid ${theme.palette.info.dark}`}} textAlign="center">
            TOL DIFF
          </Box>
        </Grid>
        {sizeRange.map((size: string, index: number) => (
            <Grid item key={index} style={{ width: '4rem', background: theme.palette.warning.light, display: 'flex', justifyContent: 'center', border: `1px solid ${theme.palette.warning.dark}` }}>
                <Typography>{size}</Typography>
            </Grid>
        ))}
      </Grid>
    );
}

export default HeadlineRow;
{/* <Grid item sx={{minWidth: '5rem'}}>
  <Box sx={{fontWeight: "bold", background: 'grey'}} textAlign="left">
    size name should be renderd inside 
  </Box>
</Grid> */}