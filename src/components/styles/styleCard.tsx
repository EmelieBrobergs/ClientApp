import { Paper, Typography } from "@mui/material";
import { CSSProperties } from "react";

const StyleCard = () => {
  return (
    <Paper elevation={1} sx={{ p: 1 }}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <Typography variant="button">Style name</Typography>
                <Typography variant="caption">Product type</Typography>
                <Typography variant="caption">Product groupe</Typography>
            </div>
            <div>
                <Typography variant="overline">Size: XX-XX</Typography>
            </div>
        </div>
  </Paper>
  );
};

export default StyleCard;

// TODO: Få in #-tag rätt responsivt, snyggt