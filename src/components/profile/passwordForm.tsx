import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography, useTheme } from "@mui/material";
import { Form, Formik } from "formik";
import * as React from "react";
import { CSSProperties, useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { userResetMessages } from "../../reduxSlices/userSlice";
import validationsForm from "./validationSchema";

interface Values {
  oldPass: string;
  newPassFirst: string;
  newPassSecond: string;
}

interface Props {
  onSubmit: (values: Values) => void;
  updatePasswordError: string | null;
  updatePasswordMessage: string | null;
}

export const PasswordForm: React.FC<Props> = ({ onSubmit, updatePasswordError, updatePasswordMessage }) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const initialValues: Values = {
    oldPass: "",
    newPassFirst: "",
    newPassSecond: "",
  };

  useEffect(() => {
    dispatch(userResetMessages());
  },[]);

  return (
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationsForm.validationsFormPassword}
            onSubmit={(values, actions) => {
              onSubmit(values);
              actions.setSubmitting(false);
            }}
          >
            {({ values, handleChange, handleBlur, touched, errors }) => (
              <Form>
                <div style={{ ...root }}>
                  <Grid container style={{ alignItems: "flex-start" }}>
                    <Grid item>
                      <TextField
                        name="oldPass"
                        placeholder="Input field..."
                        value={values.oldPass}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="input-user-oldPass"
                        label="Current Password"
                        InputLabelProps={{ shrink: true }}
                        sx={{ m: 1 }}
                        size="small"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        error={touched.oldPass && errors.oldPass ? true : false}
                      />
                      {touched.oldPass && errors.oldPass && (
                        <div style={{ ...errorStyle }}>
                          <Typography variant="subtitle1" color={theme.palette.error.main} >{errors.oldPass}</Typography>
                        </div>
                      )}
                    </Grid>
                    <Grid item>
                      <TextField
                        name="newPassFirst"
                        placeholder="Input field..."
                        value={values.newPassFirst}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="input-user-newPassFirst"
                        label="New Password"
                        InputLabelProps={{ shrink: true }}
                        sx={{ m: 1 }}
                        size="small"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        error={
                          touched.newPassFirst && errors.newPassFirst
                            ? true
                            : false
                        }
                      />
                      {touched.newPassFirst && errors.newPassFirst && (
                        <div style={{ ...errorStyle }}>
                          <Typography variant="subtitle1" color={theme.palette.error.main}>{errors.newPassFirst}</Typography>
                        </div>
                      )}
                    </Grid>
                    <Grid item>
                      <TextField
                        name="newPassSecond"
                        placeholder="Input field..."
                        value={values.newPassSecond}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="input-user-newPassSecond"
                        label="Confirm New Password"
                        InputLabelProps={{ shrink: true }}
                        sx={{ m: 1 }}
                        size="small"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        error={
                          touched.newPassSecond && errors.newPassSecond
                            ? true
                            : false
                        }
                      />
                      {touched.newPassSecond && errors.newPassSecond && (
                        <div style={{ ...errorStyle }}>
                          <Typography variant="subtitle1" color={theme.palette.error.main}>{errors.newPassSecond}</Typography>
                        </div>
                      )}
                    </Grid>
                    <Grid item>
                      <IconButton
                        sx={{ paddingTop: 2 }}
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </Grid>
                  </Grid>
                  <div style={{ alignSelf: "flex-end" }}>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ ...buttonStyle}}
                    >
                      SAVE
                    </Button>
                    {updatePasswordMessage && !updatePasswordError &&
                      <div>
                        <Typography variant="subtitle1">Message: {updatePasswordMessage}</Typography>
                      </div>
                    }
                    {updatePasswordError && 
                      <div>
                        <Typography variant="subtitle1" color={theme.palette.error.main}>Error: {updatePasswordError}</Typography>
                      </div>
                    }
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )
};

const root: CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const errorStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  width: "100%",
  paddingRight: 15,
};

const buttonStyle: CSSProperties = {
  marginTop: 3,
  justifyContent: "center",
  fontWeight: "lighter",
  width: "30ch",
};
