import { Paper, Typography, useTheme } from "@mui/material";
import { CSSProperties, useCallback, useState } from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import LoginForm from "../components/login/lLoginForm";
import { userLoginAsync } from "../reduxSlices/userSlice";

function LoginPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location: Location = useLocation();
  const state: any = location.state;
  const from: string = state.from?.pathName || "/mystyles";
  //TODO: #7 The location.state.from dosen't work, user always redirects to "/user/skg". See used example: https://reactrouter.com/docs/en/v6/examples/auth
  // const from = location.state?.from?.pathName || "/user/profile";

  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();

  const onLoginSubmit = useCallback(
    (auth: IUserCredentials) =>
      dispatch(userLoginAsync(auth)).then(
        () => {
          setMessage("");
          //   // Send them back to the page they tried to visit when they were
          //   // redirected to the login page. Use { replace: true } so we don't create
          //   // another entry in the history stack for the login page.  This means that
          //   // when they get to the protected page and click the back button, they
          //   // won't end up back on the login page, which is also really nice for the
          //   // user experience.
          navigate(from, { replace: true });
          console.log(
            "LoginPage: Auth klar, navigeras vidare om CurrentUser har satts via auth "
          );
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
        }
      ),
    [dispatch]
  );

  const loginErrorText = useAppSelector((state) => state.user.error);

  return (
    <div
    style={{
      ...root,
      backgroundImage: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.primary.contrastText}, ${theme.palette.primary.main})`,
    }}
    >
      <div style={{ ...layout }}>
        <div style={{ justifyContent: "center" }}>
          <Typography
            variant="h2"
            sx={{ ...headline, color: theme.palette.primary.dark }}
          >
            EM PLM
          </Typography>
          <Paper elevation={4} sx={{ p:3, pt: 4, pb: 4 }}>
            <LoginForm
              onSubmit={(values) => onLoginSubmit(values)}
              loginError={loginErrorText}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

const root: CSSProperties = {
  height: "100vh",
  width: "100vw",
};

const layout: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const headline: CSSProperties = {
  paddingBottom: 3,
  paddingTop: 20,
  width: "100%",
  display: "flex",
  justifyContent: "center",
};
