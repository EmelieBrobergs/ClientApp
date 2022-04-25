import { Divider, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { styleEditInfoAsync, styleFetchAsync } from "../../../reduxSlices/styleSlice";
import { InfoForm } from "./infoForm";

const LayoutInfo = () => {
    const { styleId } = useParams<"styleId">();

    const dispatch = useAppDispatch();
    const styleState = useAppSelector(state => state.style);
    const [loadStyle, setLoadStyle] = useState(styleState.styles?.find(s => s.id == styleId));

    // useEffect(() => {
    //     if (styleId) {
    //         console.log("effect körs, dispattch");
    //         dispatch(styleFetchAsync(styleId));
    //     }
    // }, [(styleId !== undefined)]);

    // NOTE: Parent make a dispatch,allways. There for I listen on the loding state only.. But relod to much..
    useEffect(() => {
        console.log("style load");
        setLoadStyle(styleState.styles?.find(s => s.id == styleId));
    }, [styleState.loading]);

    const onInfoFormSubmit = (data: {
        originalStyle: IStyle | undefined;
        styleNumber: string;
        orderNumber: string;
        name: string;
        assignedToUserId: string | undefined;
        description: string;
        productType: string;
        productGroup: string;
        tags: string[] | undefined;
    }) => {
        dispatch(styleEditInfoAsync(data));
    };

    var errorText = useAppSelector((state) => state.style.error);
    var messageText = useAppSelector((state) => state.style.message);

    return (
        <>
            {loadStyle != null &&
                <Paper elevation={4} sx={{ p: 1 }}>
                    <Typography variant="h6">Style Information</Typography>
                    <Divider sx={{ mb: 1 }} />
                    <InfoForm
                        displayStyle={loadStyle}
                        onSubmit={({ originalStyle, styleNumber, orderNumber, name, description, productType, productGroup, tags, assignedToUserId }) => {
                            onInfoFormSubmit({ originalStyle, styleNumber, orderNumber, name, description, productType, productGroup, tags, assignedToUserId });
                        }}
                        updateError={errorText}
                        updateMessage={messageText}
                    />
                </Paper>
            }
            {(loadStyle == undefined) &&
                <Paper elevation={4} sx={{ p: 1 }}>
                    <Typography variant="h6">Style Information</Typography>
                    <Divider sx={{ mb: 1 }} />
                    <div>Loding style data...</div>
                </Paper>
            }
        </>

    );
};

export default LayoutInfo;