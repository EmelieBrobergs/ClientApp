import { alpha, InputBase, Tooltip, useTheme } from "@mui/material";
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';

interface Props {
    sizeRangeId: string;
}
function MeasurementPointRowForm({ sizeRangeId }: Props) {
    const theme = useTheme();
    const dispatch = useAppDispatch();

    const sizeRangeState = useAppSelector(state => state.sizeRange); //för useEffact
    const sizeRange = useAppSelector(state => state.sizeRange.sizeRanges.find(sr => sr.id == sizeRangeId));


    const [gradingMeasurementPoint, setGradingMeasurementPoint] = useState<IGradingMeasurementPoint[]>([]);


    useEffect(() => {
        console.log("pen2.0");
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

    const updateGradingMeasurementPoint = (value: string, index: number) => {
        console.log(value);
        var copy = [...gradingMeasurementPoint];
        if (value) {
            copy[index].gradingValue = parseInt(value);
        }
        else {
            copy[index].gradingValue = 0;
        }
        setGradingMeasurementPoint(copy);
    };

    var initialValues: ICreateMeasurementPoint = {
        id: '0',
        shortName: '',
        description: '',
        tolerance: 0,
        measurementId: '0',
        gradingField: gradingMeasurementPoint   //effect som updatera initsiala värden ?
    };

    return (
        <>
            {(sizeRange != undefined) &&
                <div>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize
                        // validationSchema={validationsForm.validationsFormInfo}
                        onSubmit={async (values: ICreateMeasurementPoint) => alert(JSON.stringify(values, null, 2))}
                    >
                        {({ values, handleChange, handleBlur, touched, errors }) => (
                            <Form>
                                <div className={`grid grid-cols-${(3 + sizeRange.sizes.length)}`}>
                                    <div>
                                        <InputBase
                                            fullWidth
                                            name="shortName"
                                            value={values.shortName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            id="input-shortname"
                                            sx={{
                                                fontWeight: 'bold',
                                                display: 'flex',
                                                alignContent: 'center',
                                                backgroundColor: '',
                                                '&:hover': {
                                                    backgroundColor: alpha(theme.palette.info.dark, 0.15),
                                                },
                                            }}
                                            error={(touched.shortName && errors.shortName) ? true : false}
                                        />
                                    </div>
                                    <div>
                                        <InputBase
                                            fullWidth
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            id="input-description"
                                            sx={{
                                                display: 'flex',
                                                alignContent: 'center',
                                                backgroundColor: '',
                                                '&:hover': {
                                                    backgroundColor: alpha(theme.palette.info.dark, 0.15),
                                                },
                                            }}
                                            error={(touched.description && errors.description) ? true : false}
                                        />
                                    </div>
                                    <div>
                                        <InputBase
                                            fullWidth
                                            name="tolerance"
                                            value={values.tolerance}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            id="input-tolerance"
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
                                            error={(touched.tolerance && errors.tolerance) ? true : false}
                                        />
                                    </div>
                                    {/* </Typography> */}
                                    {/* {gradingMeasurementPoint.map((m, index) => ( */}
                                    {values.gradingField.map((m, index) => (
                                        <Tooltip title={`new point:${m.sizeName} ()`}>
                                            <div key={index}>
                                                <InputBase
                                                    fullWidth
                                                    name="gradingfield"
                                                    value={m.gradingValue}
                                                    onChange={(value) => { updateGradingMeasurementPoint(value.target.value, index); }}
                                                    onBlur={handleBlur}
                                                    id={`input-grading-value-${m.sizeOrderIndex}`}
                                                    sx={{
                                                        fontWeight: m.baseSize ? 'bold' : 'normal',
                                                        backgroundColor: m.baseSize ? theme.palette.secondary.main : '',
                                                        '&:hover': {
                                                            backgroundColor: alpha(theme.palette.info.dark, 0.15),
                                                        },
                                                        display: 'flex', alignContent: 'center', justifyContent: 'center'
                                                    }}
                                                    type="number"
                                                    error={(touched.gradingField && errors.gradingField) ? true : false}
                                                />
                                            </div>
                                        </Tooltip>
                                    ))}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            }
            {!sizeRange &&
                <div>No size range loaded...</div> // TODO: improv alt. render
            }
        </>
    );
};

export default MeasurementPointRowForm;