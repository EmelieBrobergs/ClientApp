import { Box, Divider, Paper, Accordion, AccordionDetails, AccordionSummary, Typography, useTheme } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../../../app/hooks";

interface Props {
    // TODO: Ska ta in vilken måttlista som ska visas / all info som behövs ??
    name: string
}

const MmntList = ({name}: Props) => {
    const theme = useTheme();
    const { styleId } = useParams<"styleId">();
    const styles = useAppSelector(state => state.style.styles);
    const [displayStyle, setDisplayStyle] = useState(styles?.find(s => s.id == styleId));

    return (
        <Accordion sx={{ mb: 1 }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Mmnt: {name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {displayStyle &&
                    <>
                        <Typography variant="body1">Style Id: {displayStyle.id}</Typography>
                        <Typography variant="body1">Här ska det skapas en måttlista</Typography>
                    </>
                }
                {!displayStyle &&
                    <>
                        <Typography variant="body1">No style loaded...</Typography>S
                    </>
                }
            </AccordionDetails>
        </Accordion>
    );
};

export default MmntList;