import { Box, Grid, Typography } from "@mui/material";

interface Props {
    measurementPointId: string;
}
function MeasurementPointRow({ measurementPointId }: Props) {

    // hämta från store = fälten uppdateras bra....
    const sizeRange: string[] = ['XS', 'S', 'M', 'L', 'XL'];

    // const measurementPoints: IMeasurementPoint[] = [
    //     { id: '1', shortName: 'A', description: '½ chest', tolerance: 0.5, measurementId: '9' },
    //     { id: '2', shortName: 'B', description: '½ waist', tolerance: 0.5, measurementId: '9' },
    //     { id: '3', shortName: 'C', description: '½ hip', tolerance: 1, measurementId: '9' }
    // ];

    return (
        <div className={`grid grid-cols-${(3 + sizeRange.length)}`}>
            <div>shortname</div>
            <div>description:  {measurementPointId}</div>
            <div>0.5</div>
            {sizeRange.map((size: string, index: number) => (
                <div key={index}>
                    {size}
                </div>
            ))}
        </div>
        // <Grid
        //     container
        //     item
        //     spacing={0}
        // >
        //     <Grid item >
        //         shortname
        //     </Grid>
        //     <Grid item >
        //         <Typography>
        //             description: {measurementPointId}
        //         </Typography>
        //     </Grid>
        //     <Grid item >
        //         <Typography>0.5</Typography>
        //     </Grid>
        //     <Grid item >
        //         {/* nested grid */}
        //         <Grid
        //             container
        //             spacing={0}
        //             sx={{background: 'lightblue', my:'2px'}}
        //         >
        //             {sizeRange.map((size: string, index: number) => (
        //                 <Grid item key={index} style={{ width: '2rem', background: 'grey', margin:'1px' }}>
        //                     <Typography>{size}</Typography>
        //                 </Grid>
        //             ))}
        //         </Grid>
        //         {/* nested grid end */}
        //     </Grid>
        // </Grid>
    );
}

export default MeasurementPointRow;