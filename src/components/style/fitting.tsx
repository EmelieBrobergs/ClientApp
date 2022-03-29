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
            <Divider sx={{ mt: 1, mb: 1 }} />
            {displayStyle &&
            <div>
                <Box>
                    <Typography variant="body1">Style Id: {displayStyle.id}</Typography>
                    <Typography variant="body2">For fitting data more API call and seed data need to be created</Typography>
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