import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography, useTheme } from "@mui/material";
import { CSSProperties, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { measurementPointsFetchAsync, measurementPointSortedByShortName } from '../../../reduxSlices/measurementPointSlice';
import HeadlineRow from "./gridRows/headlineRow";
import MeasurementPointRow from "./gridRows/measurementPointRow";

interface Props {
    name: string,
    measurementId: string,
    createdDate?: Date;
}

const Measurement = ({ name, measurementId, createdDate }: Props) => {
    const theme = useTheme();
    //const { styleId } = useParams<"styleId">();
    const dispatch = useAppDispatch();

    const measurementPointState = useAppSelector(state => state.measurementPoint);
    const measurementPoints = useAppSelector(state => state.measurementPoint.measurementPoints?.filter(p => p.measurementId == measurementId));

    // useEffect(() => {
    //     if (measurementId) dispatch(measurementPointsFetchAsync(measurementId));
    // }, []);

    // useEffect(() => {
    //     dispatch(measurementPointSortedByShortName());
    // }, [measurementPointState.loading]);


    const sizeRange: string[] = ['XS', 'S', 'M', 'L', 'XL'];

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
                <div>Created: {createdDate}</div>
                {/* <HeadlineRow /> */}
                {/* {measurementPoints.length > 0 &&
                    <>
                        {measurementPoints.map((point: IMeasurementPoint) => (
                            <MeasurementPointRow key={point.id} measurementPointId={point.id} /> // All info kanske ska skickas in ändååå ?? Tänk sen hur det fungerar vid editering...?
                        ))}
                    </>
                } */}
                {measurementPoints.length == 0 &&
                    <>
                        <Typography variant="body1">No measurement points loaded...</Typography>
                    </>
                }
            </AccordionDetails>
        </Accordion>
    );
};

export default Measurement;

const shortName: CSSProperties = {
    justifyContent: "center",
    fontWeight: "lighter",
    width: "50px",
    border: '1 solid green'
};
const description: CSSProperties = {
    justifyContent: "center",
    fontWeight: "lighter",
    width: "200px",
    border: '1 solid green'
};
const tolerance: CSSProperties = {
    justifyContent: "center",
    fontWeight: "lighter",
    width: "50px",
    border: '1 solid green'
};
const size: CSSProperties = {
    justifyContent: "center",
    fontWeight: "lighter",
    width: "70px",
    border: '1 solid green'
};