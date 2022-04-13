import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { gradingsFetchAsync } from '../../../../reduxSlices/gradingSlice';

interface Props {
    sizeRangeId: string;
    measurementPointId: string;
}
function MeasurementPointRow({ sizeRangeId, measurementPointId }: Props) {
    const dispatch = useAppDispatch();
    const measurementPoint = useAppSelector(state => state.measurementPoint.measurementPoints?.find(p => p.id == measurementPointId));
    const sizeRange = useAppSelector(state => state.sizeRange.sizeRanges.find(sr => sr.id == sizeRangeId));
    const gradings = useAppSelector(state => state.grading.gradings.filter(g => g.measurementPointId == measurementPoint?.id));

    useEffect(() => {
        dispatch(gradingsFetchAsync(measurementPointId));
        console.log("Log: File layoutMeasurement.tsx useEffect körs");
    }, []);

    // få fram hur många storlekar, ordningen på dom
    // få fram vilken som är basstorleken (fetmarkera)
    // TODO: grading, få fram rätt position för dom genom SizeId  --> Skapa ett state med en lista...

    return (
        <>
            {measurementPoint && (sizeRange != undefined) &&
                // <div className={`grid grid-cols-${(3 + sizeRange.sizes.length)}`}>  // TODO: Improv Tailwind set up to be able to render caculated grid cols
                <div className={`grid grid-cols-12`}>
                    {console.log(JSON.stringify(gradings[3], null, 2))}
                    <Typography variant='body1' >{measurementPoint.shortName}</Typography>
                    <Typography variant='body1' >{measurementPoint.description}</Typography>
                    <Typography variant='body1' sx={{ display: 'flex', justifyContent: 'center' }}>{measurementPoint.tolerance}</Typography>
                    {/* {sizeRange.sizes.map(sr => (
                        <div key={sr.id}>
                            {"OI:" + sr.orderIndex}
                            Har bytt fr number till string men märker det inte ??
                            {console.log(JSON.stringify(sr, null, 2))}

                        </div>
                    ))} */}
                    {gradings.map(g => (
                        <Typography key={g.id} variant='body1' sx={{ display: 'flex', justifyContent: 'center' }}>{g.value}</Typography>
                    ))}
                </div>
            }
            {!sizeRange &&
                <div>No size range loaded...no measurement point will de renderd?? hm..or should they?</div> // TODO: improv alt. render
            }
            {!measurementPoint &&
                <div>No measurement point loaded inside row...</div>
            }
        </>
    );
}

export default MeasurementPointRow;