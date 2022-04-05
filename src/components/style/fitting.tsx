import { Box, Divider, Paper, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../../app/hooks";

const Fitting = () => {
    const theme = useTheme();
    const { styleId } = useParams<"styleId">();
    const styles = useAppSelector(state => state.style.styles);
    const [displayStyle, setDisplayStyle] = useState(styles?.find(s => s.id == styleId));

    return (
        <Paper elevation={4} sx={{ p: 1 }}>
            <Typography variant="h6">Fitting</Typography>
            <Divider sx={{ mb: 1 }} />
            {displayStyle &&
            <div>
                <Box>
                    <Typography variant="body1">Style Id: {displayStyle.id}</Typography>
                </Box>
                <Box sx={{ pt: 5, tb: 5}}>
                    <Typography variant="h5">Information att presentera</Typography>
                    <Typography variant="body2">Fitting array length</Typography>
                    <Typography variant="body1">Detail data of One Fitting object)</Typography>
                    <Typography variant="body2">Fitting.Name</Typography>
                    <Typography variant="body2">Fitting.CreationDate</Typography>
                    <Typography variant="body2">Fitting.Pictures (hur sparas dessa i db, hämtas ?)</Typography>
                    <Typography variant="body2">Fitting.Comment</Typography>
                    <Typography variant="body2">Fitting.FinalComment</Typography>
                </Box>
            </div>
            }
            {!displayStyle &&
                <Typography variant="body1">No style loaded...</Typography>
            }
        </Paper>
    );
};

export default Fitting;