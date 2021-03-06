import { Card, Tooltip, Typography, useTheme, CardActionArea, CardContent, Chip } from "@mui/material";
import { CSSProperties } from "react";
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { Link } from "react-router-dom";

const styleId = '12345';

// "DuM komponent" som får all data inskickad till sig
interface Props{
    style: IStyle;
}

const StyleCard = ({style}: Props) => {
    const theme = useTheme();
    return (
        <Card elevation={1}>
            <CardActionArea component={Link} to={`/style/${style.id}/info`}>
                {/* TODO: Replace div with CardMedia below? */}
                {/* <div style={{ height: '5rem', width: '5rem', flexShrink: '0', marginRight: '8px', background: theme.palette.secondary.main, ...centeredContent }}>
                    <BrokenImageIcon style={{ color: theme.palette.info.main }} />
                </div> */}
                <CardContent style={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Tooltip title="Style name" placement="left-start" arrow >
                            <Typography variant="body1" noWrap >{style.name}</Typography>
                        </Tooltip>
                        <div style={{ display: 'flex', flexGrow: '1' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', overflow: "hidden", textOverflow: "ellipsis", minWidth: '6rem', flexShrink: '0' }}>
                                <Tooltip title="Product groupe : type" placement="left-start" arrow >
                                    <Typography variant="caption">{style.productGroup} : {style.productType}</Typography>
                                </Tooltip>
                                <Tooltip title="Order number" placement="left-start" arrow >
                                    <Typography  variant="caption">Order No: {style.orderNumber}</Typography>
                                </Tooltip>
                                <Tooltip title="Style number" placement="left-start" arrow >
                                    <Typography  variant="caption">Style No: {style.styleNumber}</Typography>
                                </Tooltip>
                                <Tooltip title="Size range" placement="left-start" arrow >
                                    <Typography  variant="caption">Size: XX-XX</Typography>
                                </Tooltip>
                            </div>
                            <div style={{ ...centeredTags, flexWrap: 'wrap' }}>
                                {style.tags.map((item: string, index: number) => (
                                    <Chip key={index} size="small" style={{ margin: '2px', padding: '0px', backgroundColor: theme.category.tags.primary, color: theme.category.tags.secondary}} label={`#${item}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default StyleCard;

const centeredTags: CSSProperties = {
    display: 'flex',
    flexGrow: '1',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'flex-end',
    alignItems: 'center',
    textAlign: 'center'
};