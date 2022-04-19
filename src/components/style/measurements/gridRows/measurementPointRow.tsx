import { Tooltip, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { gradingsFetchAsync } from '../../../../reduxSlices/gradingSlice';

interface Props {
    sizeRangeId: string;
    measurementPointId: string;
}
function MeasurementPointRow({ sizeRangeId, measurementPointId }: Props) {
    const theme = useTheme();
    const dispatch = useAppDispatch();

    const sizeRangeState = useAppSelector(state => state.sizeRange); //för useEffact
    const measurementPoint = useAppSelector(state => state.measurementPoint.measurementPoints?.find(p => p.id == measurementPointId));
    const sizeRange = useAppSelector(state => state.sizeRange.sizeRanges.find(sr => sr.id == sizeRangeId));
    const gradings = useAppSelector(state => state.grading.gradings.filter(g => g.measurementPointId == measurementPoint?.id));

    useEffect(() => {
        dispatch(gradingsFetchAsync(measurementPointId));
    }, []);

    const [gradingMeasurementPoint, setGradingMeasurementPoint] = useState<IGradingMeasurementPoint[]>([]);

    useEffect(() => {
        console.log("penis");
        var items: IGradingMeasurementPoint[] = [];
        sizeRange?.sizes.forEach(size => {
            var grading = gradings.find(g => g.sizeId == size.id);
            if (grading) {
                var item: IGradingMeasurementPoint = {
                    gradingId: grading.id,
                    sizeName: size.name,
                    gradingValue: grading.value,
                    calculatedSizeValue: 0,  // vill ha det beräknade värdet här...kanske ska göras i databasen direkt ?
                    sizeOrderIndex: size.orderIndex,
                    baseSize: size.name == sizeRange.baseSizeName ? true : false
                };
                items.push(item);
            }
        });
        setGradingMeasurementPoint(items);
        gradingMeasurementPoint.sort((a, b) => (b.sizeOrderIndex as any) - (a.sizeOrderIndex as any));

    }, [(gradings.length > 0), sizeRange !== undefined, sizeRangeState]); // TODO: Lägg till lyssnare kopplat till updatering av grading värde

    return (
        <>
            {gradingMeasurementPoint.length > 0 && measurementPoint && (sizeRange != undefined) &&
                <div className={`grid grid-cols-${(3 + sizeRange.sizes.length)}`}>
                    <Typography variant='body1' sx={{ fontWeight: 'bold', display: 'flex', alignContent: 'center' }}>{measurementPoint.shortName}</Typography>
                    <Typography variant='body1' sx={{ display: 'flex', alignContent: 'center' }}>{measurementPoint.description}</Typography>
                    <Typography variant='body1' sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', borderLeft: `2px solid ${theme.palette.secondary.main}`, borderRight: `2px solid ${theme.palette.secondary.main}` }}>{measurementPoint.tolerance}</Typography>
                    {gradingMeasurementPoint.map((m) => (
                        <Tooltip title={`${measurementPoint.shortName}:${m.sizeName} (${m.gradingValue})`}>
                            <Typography
                                key={m.gradingId}
                                variant='body1'
                                sx={{
                                    fontWeight: m.baseSize ? 'bold' : 'normal',
                                    backgroundColor: m.baseSize ? theme.palette.secondary.main : '',
                                    display: 'flex', alignContent: 'center', justifyContent: 'center'
                                }}
                            >
                                {m.gradingValue}
                            </Typography>
                        </Tooltip>
                    ))}
                </div>
            }
            {!sizeRange &&
                <div>No size range loaded...</div> // TODO: improv alt. render
            }
            {!measurementPoint &&
                <div>No measurement point loaded inside row...</div>
            }
            {gradingMeasurementPoint.length == 0 &&
                <div>Loading data...</div>
            }
        </>
    );
}

export default MeasurementPointRow;