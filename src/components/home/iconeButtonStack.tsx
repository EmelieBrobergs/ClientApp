import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import { Avatar, IconButton, Stack, Tooltip, useTheme } from "@mui/material";
import { useState } from 'react';
import { Link } from 'react-router-dom';


interface Props {
    styleId: string | undefined;
}

export default function IconeButtonStack({ styleId }: Props) {
    const theme = useTheme();

    const [isSelected, setSelected] = useState<string>("");

    const handleClick = (buttonName: string) => {
        setSelected(buttonName);
    };

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={0}
            style={{ marginBottom: '15rem' }}
        >
            <Tooltip title={`Style information`} placement="right" arrow>
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}
                    variant="square"
                    component={Link} to={`${styleId}/info`}
                >
                    <IconButton onClick={() => handleClick('information')}>
                        <PendingOutlinedIcon sx={{ color: isSelected === 'information' ? theme.palette.info.main : theme.palette.primary.contrastText }} />
                    </IconButton>
                </Avatar>
            </Tooltip>
            <Tooltip title={`Measurement list`} placement="right" arrow>
                <Avatar
                    sx={{ bgcolor: theme.palette.primary.main }}
                    variant="square"
                    component={Link} to={`${styleId}/mmntlist`}
                >
                    <IconButton onClick={() => handleClick('mmntlist')}>
                    <ListOutlinedIcon sx={{ color: isSelected === 'mmntlist' ? theme.palette.info.main : theme.palette.primary.contrastText }} />
                    </IconButton>
                </Avatar>
            </Tooltip>
            <Tooltip title={`Fitting picture/comment`} placement="right" arrow>
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}
                    variant="square"
                    component={Link} to={`${styleId}/fitting`}
                >
                    <IconButton onClick={() => handleClick('fitting')}>
                        <AspectRatioIcon sx={{ color: isSelected === 'fitting' ? theme.palette.info.main : theme.palette.primary.contrastText }} />
                    </IconButton>
                </Avatar>
            </Tooltip>
            <Tooltip title={`Handle sample`} placement="right" arrow>
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}
                    variant="square"
                    component={Link} to={`${styleId}/handlesample`}
                >
                    <IconButton onClick={() => handleClick('handlesample')}>
                        <PlaylistAddCheckOutlinedIcon sx={{ color: isSelected === 'handlesample' ? theme.palette.info.main : theme.palette.primary.contrastText }} />
                    </IconButton>
                </Avatar>
            </Tooltip>
        </Stack>
    )
}