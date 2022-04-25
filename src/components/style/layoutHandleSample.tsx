import { Box, Divider, Paper, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../../app/hooks";

const LayoutHandleSample = () => {
    const theme = useTheme();
    const { styleId } = useParams<"styleId">();
    const styles = useAppSelector(state => state.style.styles);
    const [displayStyle, setDisplayStyle] = useState(styles?.find(s => s.id == styleId));

    return (
        <Paper elevation={4} sx={{ p: 1 }}>
            <Typography variant="h6">Handle Sample</Typography>
            <Divider sx={{ mb: 1 }} />
            {displayStyle &&
                <div>
                    <Box>
                        <Typography variant="body1">Style Id: {displayStyle.id}</Typography>
                        <Typography variant="body2" sx={{ pt: 2 }}>Detta flöde behövs tänkas igenom..!</Typography>
                        <Typography variant="body2" sx={{ pt: 2 }}>Går det att återanvända en hel modul från mmntList sidan ?</Typography>
                    </Box>
                    <Box sx={{ pt: 5, tb: 5 }}>
                        <Typography variant="h5">Hantera nytt prov:</Typography>
                        <Typography variant="body2">Kopplat till senaste skapade måttlistan (visa det på något vis)</Typography>
                        <Typography variant="body2">Välj antal prover att mäta av / storlek - namnge prov</Typography>
                        <Typography variant="body2"></Typography>
                        <Typography variant="body2" sx={{ pt: 2 }}>hmm</Typography>
                    </Box>
                </div>
            }
            {!displayStyle &&
                <Typography variant="body1">No style loaded...</Typography>
            }
        </Paper>
    );
};

export default LayoutHandleSample;