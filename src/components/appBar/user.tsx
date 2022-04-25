import { useAppSelector } from "../../app/hooks";
import { Theme, useTheme } from '@mui/material/styles';
import { Avatar, Tooltip } from "@mui/material";

export function User() {
    const theme = useTheme();
    const user = useAppSelector(state => state.user);

    const firstLetter = (user.currentUser?.firstName)?.charAt(0).toUpperCase();
    const tooltipMessage = `${user.currentUser?.firstName} ${user.currentUser?.lastName}`;

    return (
        <Tooltip title={tooltipMessage} sx={{ textTransform: 'capitalize' }} placement="bottom" arrow >
            <Avatar sx={{ width: 24, height: 24, bgcolor: theme.category.user.primary, color: theme.category.user.secondary, fontSize: 15 }}>{firstLetter}</Avatar>
        </Tooltip>
    );
}