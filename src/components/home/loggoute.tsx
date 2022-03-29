import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { IconButton, Tooltip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userLogoutAsync } from "../../reduxSlices/userSlice";

export function Loggoute() {
    const user = useAppSelector(state => state.user);
    const fullName = `${user.currentUser?.firstName} ${user.currentUser?.lastName}` as string;
    const dispatch = useAppDispatch();

    const handleLoggout = () => {
        dispatch(userLogoutAsync());
    };

    return (
        <Tooltip title={`Loggoute ${fullName} from EmPLM`} placement="bottom" arrow >
            <IconButton
                onClick={handleLoggout}
                size="large"
                edge="end"
                color="inherit"
                aria-label="logout"
                sx={{ ml: 2 }}
            >
                <ExitToAppIcon />
            </IconButton>
        </Tooltip>
    )
}