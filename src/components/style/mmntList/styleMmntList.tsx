import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Paper, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../../../app/hooks";
import MmntList from "./mmntlist";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyleMmntList = () => {
    const theme = useTheme();
    const { styleId } = useParams<"styleId">();
    const styles = useAppSelector(state => state.style.styles);
    const [displayStyle, setDisplayStyle] = useState(styles?.find(s => s.id == styleId));

    return (
        <>
        {/* TODO: HÄmta ut alla måttlistor och skicka in datan till nedan component */}
            <MmntList name={'1st fitting'}/>
            <MmntList name={'2nd fitting'}/>
            <MmntList name={'PPS'}/>
            <MmntList name={'Rev PPS'}/>
            <Paper elevation={4} sx={{ p: 1 }}>
                <Typography variant="h6">Measurementlist</Typography>
                <Divider sx={{ mb: 1 }} />
                {displayStyle &&
                    <div>
                        <Box>
                            <Typography variant="body1">Style Id: {displayStyle.id}</Typography>
                        </Box>
                        <Box sx={{ pt: 5, tb: 5 }}>
                            <Typography variant="h5">Information att presentera</Typography>
                            <Typography variant="body2">MmntList array: Antal måttlistor = antal paper på denna vy</Typography>
                            <Typography variant="body2" sx={{ pt: 2 }}>mmntList.sizerange  = typ?   : Antal storlekar, basstorlek, namn</Typography>
                            <Typography variant="body2">mmntList.name</Typography>
                            <Typography variant="body2">mmntList.creationDate   (för att kunna sortera dom ?)</Typography>
                            <Typography variant="body2">mmntList.basedonMmntListId</Typography>
                            <Typography variant="body2">mmntList.unitOfMeasure  (fundera på att ha en enum för val av måttenhet, ev ej viktig.)</Typography>
                            <Typography variant="body2">mmntList.pictures  = array = måttskiss-bilder   (SVÅR + viktig)</Typography>
                            <Typography variant="body2" sx={{ pt: 2 }}>MmntPoint array: Antal måttpunkter</Typography>
                            <Typography variant="body2">Todo: Skapa en rubrik rad (endast antal måttpunkter/basstorlek som ändras)</Typography>
                            <Typography variant="body2" sx={{ pt: 2 }}>Rendera ut all information för en måttpunkt (placera graderingsvärden rätt = måste vara möjligt) </Typography>
                            <Typography variant="body2">mmntPoint.shortName </Typography>
                            <Typography variant="body2">mmntPoint.description </Typography>
                            <Typography variant="body2">mmntPoint.tolerance </Typography>
                            <Typography variant="body2">mmntPoint.grading-values......   (SVÅR KOPPLING i huvudet här..!) </Typography>
                        </Box>
                    </div>
                }
                {!displayStyle &&
                    <Typography variant="body1">No style loaded...</Typography>
                }
            </Paper>
        </>
    );
};

export default StyleMmntList;