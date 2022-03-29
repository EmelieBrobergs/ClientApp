import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import MailIcon from "@mui/icons-material/Mail";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as React from "react";
import { CSSProperties, useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { userResetMessages } from "../../reduxSlices/userSlice";
import validationsForm from "./validationSchema";

interface Values extends IUserCredentials {
}

interface Props {
  onSubmit: (values: Values) => void;
  loginError: string | null;
}

const LoginForm: React.FC<Props> = ({ onSubmit, loginError }) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    dispatch(userResetMessages());
  },[]);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationsForm}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ values, handleChange, handleBlur, touched, errors }) => (
        <Form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ ...itemStyle }}>
              <Box sx={{ display: "flex", alignItems: "center", m: 1 }}>
                <MailIcon
                  sx={{ color: theme.palette.primary.dark, mr: 2, my: 0.5 }}
                />
                <TextField
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email ? true : false}
                  id="input-user-name"
                  label="Username"
                  sx={{ m: 1, width: { xs: "28ch", sm: "48ch" } }} //May need to edit the with id change of font type
                  size="small"
                  variant="outlined"
                />
              </Box>
              {touched.email && errors.email && (
                <div style={{ ...errorStyle }}>
                  <Typography variant="subtitle1" color={theme.palette.error.main}>{errors.email}</Typography>
                </div>
              )}
            </div>
            <div style={{ ...itemStyle }}>
              <Box sx={{ display: "flex", alignItems: "center", m: 1 }}>
                <LockIcon
                  sx={{ color: theme.palette.primary.dark, mr: 2, my: 0.5 }}
                />
                <FormControl sx={{ m: 1 }} size="small" variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="password"
                    sx={{ width: { xs: "27ch", sm: "43ch" } }}
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && errors.password ? true : false}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            setShowPassword(!showPassword);
                            console.log(showPassword);
                          }}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Box>
              {touched.password && errors.password && (
                <div style={{ ...errorStyle }}>
                  <Typography variant="subtitle1" color={theme.palette.error.main}>{errors.password}</Typography>
                </div>
              )}
            </div>
            <Button variant="contained" type="submit" sx={{ ...buttonStyle }}>
              LOGON
            </Button>
            {loginError && 
              <div>
                <Typography variant="subtitle1" color={theme.palette.error.main}>Error: {loginError}</Typography>
              </div>
            }
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

const itemStyle: CSSProperties = {
  justifyContent: "center",
};

const errorStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  fontWeight: "lighter",
  width: "100%",
  paddingRight: 15,
};

const buttonStyle: CSSProperties = {
  marginTop: 3,
  justifyContent: "center",
  fontWeight: "lighter",
  width: "30ch",
};
