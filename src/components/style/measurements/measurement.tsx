import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography, useTheme } from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { measurementPointsFetchAsync, measurementPointSortedByShortName } from '../../../reduxSlices/measurementPointSlice';
import { sizeRangeFetchAsync } from '../../../reduxSlices/sizeRangeSlice';
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

    const measurementPointState = useAppSelector(state => state.measurementPoint);  //osäker på denna
    const measurementPoints = useAppSelector(state => state.measurementPoint.measurementPoints?.filter(p => p.measurementId == measurementId));
    const sizeRange = useAppSelector(state => state.sizeRange.sizeRanges.find(sr => sr.measurementId == measurementId));

    const [doEffect, setDoEffect] = useState<boolean>(false);
    const [renderDetails, setRenderDetails] = useState<boolean>(false);

    useEffect(() => {
        if (doEffect) {
            dispatch(measurementPointSortedByShortName());
            setDoEffect(false);
        }
    }, [measurementPointState.loading]);  // TODO: Håll koll så den inte körs x10000 framöver

    const onChangeExpanded = () => {
        dispatch(measurementPointsFetchAsync(measurementId));
        dispatch(sizeRangeFetchAsync(measurementId));
        setDoEffect(true);
    };

    return (
        <Accordion
            sx={{ mb: 1 }}
            onChange={(_e, expanded) => {
                if (expanded) {
                    onChangeExpanded();
                    setRenderDetails(true);
                }
                if (!expanded) {
                    setRenderDetails(false);
                }
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Measurement: {name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className={'w-full flex justify-end'}>
                    {createdDate && <Typography variant='caption'>Created: {createdDate}</Typography>}
                </div>
                {measurementPoints.length > 0 && (sizeRange != undefined) && renderDetails &&
                    <>
                        <HeadlineRow key={sizeRange.id} sizeRangeId={sizeRange.id} />
                        <Divider />
                        {measurementPoints.map((point: IMeasurementPoint) => (
                            <>
                                <MeasurementPointRow key={point.id} sizeRangeId={sizeRange.id} measurementPointId={point.id} />
                                <Divider />
                            </>
                        ))}
                    </>
                }
                {measurementPoints.length == 0 &&
                    <>
                        <Typography variant="body1">No measurement points</Typography>
                    </>
                }
                {!sizeRange &&
                    <>
                        <Typography variant="body1">No size range</Typography>
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