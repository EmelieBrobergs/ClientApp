import { alpha, Tooltip, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { gradingsFetchAsync } from '../../../../reduxSlices/gradingSlice';

interface Props {
    sizeRangeId: string;
}
function InputMeasurementPointRow({ sizeRangeId }: Props) {
    const theme = useTheme();
    const dispatch = useAppDispatch();

    const sizeRangeState = useAppSelector(state => state.sizeRange); //för useEffact
    const sizeRange = useAppSelector(state => state.sizeRange.sizeRanges.find(sr => sr.id == sizeRangeId));


    const [gradingMeasurementPoint, setGradingMeasurementPoint] = useState<IGradingMeasurementPoint[]>([]);


    useEffect(() => {
        console.log("penis2.0");
        var orderIndex = 1;
        var items: IGradingMeasurementPoint[] = [];
        sizeRange?.sizes.forEach(size => {
            var item: IGradingMeasurementPoint = {
                gradingId: '0',
                sizeName: size.name,
                gradingValue: 0,
                calculatedSizeValue: 0,
                sizeOrderIndex: orderIndex.toString(),
                baseSize: size.name == sizeRange.baseSizeName ? true : false
            };
            items.push(item);
            orderIndex++;
        });
        setGradingMeasurementPoint(items);
        gradingMeasurementPoint.sort((a, b) => (b.sizeOrderIndex as any) - (a.sizeOrderIndex as any));

    }, [sizeRange !== undefined, sizeRangeState]); // TODO: Lägg till lyssnare kopplat till updatering av grading värde

    // TODO:
    // gör rutorna klickbara, fylla i värde
    // gör användare medveten om sparande status genom färger ?


    // Skapa något formulär..när allt korrekt ifyllt  --> createMeasurementPoint(data: ICreateMeasurementPoint)

    return (
        <>
            {(sizeRange != undefined) &&
                <div className={`grid grid-cols-${(3 + sizeRange.sizes.length)}`}>
                    <Typography
                        variant='body1'
                        sx={{
                            fontWeight: 'bold',
                            display: 'flex',
                            alignContent: 'center',
                            backgroundColor: '',
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.info.dark, 0.15),
                            },
                        }}
                    >
                        sn
                    </Typography>
                    <Typography
                        variant='body1'
                        sx={{
                            display: 'flex',
                            alignContent: 'center',
                            backgroundColor: '',
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.info.dark, 0.15),
                            },
                        }}
                    >
                        description
                    </Typography>
                    <Typography
                        variant='body1'
                        sx={{
                            display: 'flex',
                            alignContent: 'center',
                            justifyContent: 'center',
                            borderLeft: `2px solid ${theme.palette.secondary.main}`,
                            borderRight: `2px solid ${theme.palette.secondary.main}`,
                            backgroundColor: '',
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.info.dark, 0.15),
                            },
                        }}
                    >
                        tol value
                    </Typography>
                    {gradingMeasurementPoint.map((m, index) => (
                        <Tooltip title={`new point:${m.sizeName} ()`}>
                            <Typography
                                key={index}
                                variant='body1'
                                sx={{
                                    fontWeight: m.baseSize ? 'bold' : 'normal',
                                    backgroundColor: m.baseSize ? theme.palette.secondary.main : '',
                                    '&:hover': {
                                        backgroundColor: alpha(theme.palette.info.dark, 0.15),
                                    },
                                    display: 'flex', alignContent: 'center', justifyContent: 'center'
                                }}
                            >
                                input
                            </Typography>
                        </Tooltip>
                    ))}
                </div>
            }
            {!sizeRange &&
                <div>No size range loaded...</div> // TODO: improv alt. render
            }
        </>
    );
}

export default InputMeasurementPointRow;