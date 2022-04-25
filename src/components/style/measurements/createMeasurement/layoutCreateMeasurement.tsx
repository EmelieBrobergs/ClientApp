import { Divider, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { measurementCreateWithSizeRangeAsync } from '../../../../reduxSlices/measurementSlice';
import { CreateMeasurementForm } from './createMeasurementForm';

const LayoutCreateMeasurement = () => {
    const { styleId } = useParams<"styleId">();

    const dispatch = useAppDispatch();
    const styleState = useAppSelector(state => state.style);
    const [loadStyle, setLoadStyle] = useState(styleState.styles?.find(s => s.id == styleId));

    // var formSent = false;
    // var createSizeRange: ICreateSizeRange = {
    //     measurementId: '',
    //     baseSizeName: null,
    //     sizes: []
    // };

    useEffect(() => {
        console.log("style load");
        setLoadStyle(styleState.styles?.find(s => s.id == styleId));
    }, [styleState.loading]);

    const onFormSubmit = (data: ICreateMeasurement) => {
        dispatch(measurementCreateWithSizeRangeAsync(data));
        // TODO: Skapa en POST metod i ReduxSlice measurement" med input ICreateMeasurementForm + styleId ?
        console.log(`Formulär mottaget, styleId: ${data.styleId}, name: ${data.name}, basesize: ${data.sizeRange.baseSizeName}, sizes.lenght: ${data.sizeRange.sizes.length}`);
    };

    var errorText = useAppSelector((state) => state.measurement.error);
    var messageText = useAppSelector((state) => state.measurement.message);

    return (
        <>
            {loadStyle != null &&
                <Paper elevation={4} sx={{ p: 1 }}>
                    <Typography variant="h6">Create Measurement</Typography>
                    <Divider sx={{ mb: 1 }} />
                    <CreateMeasurementForm
                        onSubmit={((values) => onFormSubmit(values))}
                        updateError={errorText}
                        updateMessage={messageText}
                        styleId={loadStyle.id}
                    />
                </Paper>
            }
            {(loadStyle == undefined) &&
                <Paper elevation={4} sx={{ p: 1 }}>
                    <Typography variant="h6">Create Measurement</Typography>
                    <Divider sx={{ mb: 1 }} />
                    <div>Loding style data...</div>
                </Paper>
            }
        </>

    );
};

export default LayoutCreateMeasurement;