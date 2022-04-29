import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { measurementsFetchAsync, measurementSortedByCreatedDate } from '../../../reduxSlices/measurementSlice';
import InputTagsArray from '../inputTagsArray';
import LayoutCreateMeasurement from './createMeasurement/layoutCreateMeasurement';
import FirstMeasurement from './firstMeasurement ';
import Measurement from './measurement';

const LayoutMeasurements = () => {
    const theme = useTheme();
    const { styleId } = useParams<"styleId">();
    const dispatch = useAppDispatch();
    const measurementState = useAppSelector(state => state.measurement);
    const measurements = useAppSelector(state => state.measurement.measurements?.filter(m => m.styleId == styleId));

    useEffect(() => {
        if (styleId) dispatch(measurementsFetchAsync(styleId));
    }, []);

    // useEffect(() => {
    //     dispatch(measurementSortedByCreatedDate());
    //     console.log("Sortering, onödigt ofta?");
    // }, [(measurements.length > 0 && measurementState.loading)]);   // NOTE: Flyttat in i Redux, sorterar direkt i FULLFILLED

    return (
        <>
            {measurements.length > 1 && measurements.map((m: IMeasurement) => (
                <Measurement key={m.id} name={m.name} measurementId={m.id} createdDate={m.createdDate} />
            ))}
            {measurements.length == 1 && measurements.map((m: IMeasurement) => (
                <>
                    {/* TODO: Presentera en editerbar måttlista */}
                    <FirstMeasurement key={m.id} name={m.name} measurementId={m.id} createdDate={m.createdDate} />
                </>
            ))}
            {measurements.length == 0 &&
                <>
                    {/* NOTE: Vill inte att denna vy ska renderas ut medans man väntar på svar fån db ..! Endast om inga measurement finns, IMPORTANT!! */}
                    <LayoutCreateMeasurement />
                </>
            }
        </>
    );
};

export default LayoutMeasurements;
