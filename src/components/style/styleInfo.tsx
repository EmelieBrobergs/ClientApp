import { Box, Divider, Paper, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../../app/hooks";

const StyleInfo = () => {
    const theme = useTheme();
    const { styleId } = useParams<"styleId">();
    const styles = useAppSelector(state => state.style.styles);
    const [displayStyle, setDisplayStyle] = useState(styles?.find(s => s.id == styleId));

    return (
        <Paper elevation={4} sx={{ p: 1 }}>
            <Typography variant="h6">Style Information</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            {displayStyle &&
            <div>
                <Box>
                    <Typography variant="body1">Style Id: {displayStyle.id}</Typography>
                    <Typography variant="body1">Order No: {displayStyle.orderNumber}</Typography>
                    <Typography variant="body1">Template: Denna information behövs hämtas från länkad tabell MmntList (första måttlistan? / eller se till så alla versioner ärver samma info)</Typography>
                    <Typography variant="body1">Style name: {displayStyle.name}</Typography>
                    <Typography variant="body1">Size range: Information behöver hämtas från länkade tebeller..</Typography>
                </Box>
                <Box>
                    <Typography variant="body1">Descriptoion: {displayStyle.description}</Typography>
                </Box>
            </div>
            }
            {!displayStyle &&
                <Typography variant="body1">No style loaded...</Typography>
            }
        </Paper>
    );
};

export default StyleInfo;