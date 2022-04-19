import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { measurementsFetchAsync, measurementSortedByCreatedDate } from '../../../reduxSlices/measurementSlice';
import Measurement from './measurement';

const LayoutMeasurements = () => {
    const theme = useTheme();
    const { styleId } = useParams<"styleId">();
    const dispatch = useAppDispatch();
    const measurementState = useAppSelector(state => state.measurement);
    const measurements = useAppSelector(state => state.measurement.measurements?.filter(m => m.styleId == styleId));

    useEffect(() => {
        if (styleId) dispatch(measurementsFetchAsync(styleId));
        console.log("Log: File layoutMeasurement.tsx useEffect körs");
    }, []);

    useEffect(() => {
        dispatch(measurementSortedByCreatedDate());
    }, [measurementState.loading]);

    return (
        <>
            {measurements.length > 0 && measurements.map((m: IMeasurement) => (
                <Measurement key={m.id} name={m.name} measurementId={m.id} createdDate={m.createdDate} />
            ))}
            {measurements.length == 0 &&
                <div>No measurement registerd to this style, db id: {styleId}</div>
            }
        </>
    );
};

export default LayoutMeasurements;
