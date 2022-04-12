import { Box, Divider, Typography, useTheme } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";


interface Props {
    styleId: string | undefined;
}

export const easyInfoBoxWidth = 240;

export default function EasyInfoBox({ styleId }: Props) {
    const theme = useTheme();
    const style = useAppSelector(state => state.style.styles?.find(s => s.id === styleId));

    function displayRow(label: string, data: string | undefined) {
        return (
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <Typography variant='caption' sx={{width: '100px', fontWeight: 'bold'}}>{label}: </Typography>
                <Typography variant='caption'>{data}</Typography>
            </div>
        )
    }

    return (
       <Box style={{
        width: `${easyInfoBoxWidth}px`,
        height: '100%',
        paddingLeft: '10px',
        paddingRight: '10px'
       }}>
           <div>
               {displayRow('Style No', style?.styleNumber)}
               {displayRow('Order No', style?.orderNumber)}
               {displayRow('Name', style?.name)}
               {displayRow('Assigned To', style?.assignedToUserId?.toString())}
               {displayRow('Group', style?.productGroup)}
               {displayRow('Type', style?.productType)}
               {displayRow('Based on', '..data saknas.. ')}
               {displayRow('Size Range', '..hämta data..')}
           </div>
           <Divider sx={{my: 1}} light/>
           <div>
                <Typography variant='caption' sx={{display:'inline', fontWeight: 'bold'}}>Description: </Typography>
                <Typography variant='caption' sx={{display:'inline'}}>{style?.description}</Typography>
           </div>
           <Divider sx={{my: 1}} light/>
           <div>
                <Typography variant='caption' sx={{fontWeight: 'bold'}}>Samples:</Typography>
                <ul style={{ marginLeft: '1rem'}}>
                    <li><Typography variant='caption'>1st fitting</Typography></li>
                    <li><Typography variant='caption'>2nd fitting</Typography></li>
                    <li><Typography variant='caption'>PPS</Typography></li>
                    <li><Typography variant='caption'>Rev PPS</Typography></li>
                    <li><Typography variant='caption'>(hur nås sample data?)</Typography></li>
                </ul>
           </div>
       </Box>
    )
}