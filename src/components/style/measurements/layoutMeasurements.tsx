import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { measurementsFetchAsync, measurementSortedByCreatedDate } from '../../../reduxSlices/measurementSlice';
import InputTagsArray from '../inputTagsArray';
import LayoutCreateMeasurement from './createMeasurement/layoutCreateMeasurement';
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
                    <div>ONE measurement found for Style id: {styleId}</div>
                    <div>Measurement id: {m.id}</div>
                    <Measurement key={m.id} name={m.name} measurementId={m.id} createdDate={m.createdDate} />
                    <br />
                    <div>Switch view, render a "editerbar" measurement list</div>
                    <div>När en rad är korrekt ifylld och användaren klickar ur den görs ett API anrop och sparar MeasurementPoint</div>
                    <div>Är raden inte korrekt ifylld när användare lämnar den, blir den röd (inget API anrop)</div>
                    <div>Ändras en redan sparad rad, görs ett api update anrop när användare lämnar raden (om korrekt ifylld)</div>
                    <div>Finns alltid en tom rad längst ned.. hur när en ny ploppar upp får jag testa vad som är snyggt.</div>
                    <br />
                    <div>Om endast en måttlista finns, och ingen provhantering ska det gå att eitera den i denna vy.</div>
                    <div>Nya måttlistor skapas sedan i Handle sample vyn, och visas endast i denna vy (med ev tydlighet i förändrade mått)</div>
                </>
            ))}
            {measurements.length == 0 &&
                <>
                    {/* NOTE: Vill inte att denna vy ska renderas ut medans man väntar på svar fån db ..! Endast om inga measurement finns, IMPORTANT!! */}
                    <div>No measurement found for Style id: {styleId}</div>
                    <br />

                    <LayoutCreateMeasurement />
                    <InputTagsArray />
                </>
            }
        </>
    );
};

export default LayoutMeasurements;
