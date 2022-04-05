import { Box, Divider, Paper, Typography, useTheme } from "@mui/material";
import { ErrorMessage } from "formik";
import { stringify } from "querystring";
import { useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { styleEditInfoAsync } from "../../../reduxSlices/styleSlice";
import { InfoForm } from "./infoForm";

const StyleInfo = () => {
    const theme = useTheme();
    const { styleId } = useParams<"styleId">();
    const styles = useAppSelector(state => state.style.styles);
    const [displayStyle, setDisplayStyle] = useState(styles?.find(s => s.id == styleId));

    const dispatch = useAppDispatch();
    const onInfoFormSubmit = (data: {
        style: IStyle | undefined;
        styleNumber: string;
        orderNumber: string;
        name: string;
        description: string;
        productType: string;
        productGroup: string;
    }) => {
      dispatch(styleEditInfoAsync(data));
    };

    var errorText = useAppSelector((state) => state.style.error);
    var messageText = useAppSelector((state) => state.style.message);

    return (
        <Paper elevation={4} sx={{ p: 1 }}>
            <Typography variant="h6">Style Information</Typography>
            <Divider sx={{ mb: 1 }} />
            {displayStyle &&
            <InfoForm 
                styleId={styleId} 
                onSubmit={({style, styleNumber, orderNumber, name, description, productType, productGroup}) => {
                    onInfoFormSubmit({style, styleNumber, orderNumber, name, description, productType, productGroup});
                }} 
                updateError={errorText} 
                updateMessage={messageText}
            />
            }
        </Paper>
    );
};

export default StyleInfo;