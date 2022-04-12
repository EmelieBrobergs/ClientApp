import { Divider, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { styleEditInfoAsync } from "../../../reduxSlices/styleSlice";
import { InfoForm } from "./infoForm";

const LayoutInfo = () => {
    const { styleId } = useParams<"styleId">();
    const styles = useAppSelector(state => state.style.styles); // NotE: Is there a better way ?
    const [displayStyle, setDisplayStyle] = useState(styles?.find(s => s.id == styleId));

    const dispatch = useAppDispatch();
    const onInfoFormSubmit = (data: {
        style: IStyle | undefined;
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

        <Paper elevation={4} sx={{ p: 1 }}>
            <Typography variant="h6">Style Information</Typography>
            <Divider sx={{ mb: 1 }} />
            {displayStyle &&
                <InfoForm 
                    styleId={displayStyle.id} 
                    onSubmit={({style, styleNumber, orderNumber, name, description, productType, productGroup, tags, assignedToUserId}) => {
                        onInfoFormSubmit({style, styleNumber, orderNumber, name, description, productType, productGroup, tags, assignedToUserId});
                    }} 
                    updateError={errorText} 
                    updateMessage={messageText}
                />
            }
            {!displayStyle &&
                <Typography variant="body1">No style loaded...</Typography>
            }
        </Paper>
    );
};

export default LayoutInfo;