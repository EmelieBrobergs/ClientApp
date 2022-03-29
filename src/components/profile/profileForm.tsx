import { Button, InputAdornment, TextField, Typography, useTheme } from "@mui/material";
import { Form, Formik } from "formik";
import * as React from "react";
import { CSSProperties, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userResetMessages } from "../../reduxSlices/userSlice";
import validationsForm from "./validationSchema";

interface Values {
  user: IUser | null;
  firstName: string;
  lastName: string;
}

interface Props {
  onSubmit: (values: Values) => void;
  updateNameError: string | null;
  updateNameMessage: string | null;
}

export const ProfileForm: React.FC<Props> = ({onSubmit, updateNameError, updateNameMessage }) => {
  const theme = useTheme();
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  
  var initialValues: Values = { 
    user: user.currentUser,
    firstName: user.currentUser ? user.currentUser.firstName : "", 
    lastName: user.currentUser ? user.currentUser.lastName : "", 
  };

  useEffect(() => {
    dispatch(userResetMessages());
  },[]);

  return (
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationsForm.validationsFormProfile}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            {({ values, handleChange, handleBlur, touched, errors }) => (
              <Form>
                <div style={{ ...root }}>
                  <div>
                    <TextField
                      fullWidth
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="input-user-firstName"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            First name:
                          </InputAdornment>
                        ),
                      }}
                      sx={{ m: 1 }}
                      variant="standard"
                      error={(touched.firstName && errors.firstName) ? true : false}
                    />
                  </div>
                  <div>
                    <TextField
                      fullWidth
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="input-user-lastName"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            Last name:
                          </InputAdornment>
                        ),
                      }}
                      sx={{ m: 1 }}
                      variant="standard"
                      error={(touched.lastName && errors.lastName) ? true : false}

                    />
                  </div>
                  <div style={{ alignSelf: "flex-end" }}>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ ...buttonStyle }}
                      >
                      SAVE
                    </Button>
                    {updateNameMessage && !updateNameError &&
                      <div>
                        <Typography variant="subtitle1">Message: {updateNameMessage}</Typography>
                      </div>
                    }
                    {updateNameError && 
                      <div>
                        <Typography variant="subtitle1" color={theme.palette.error.main}>Error: {updateNameError}</Typography>
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

const buttonStyle: CSSProperties = {
  marginTop: 3,
  justifyContent: "center",
  fontWeight: "lighter",
  width: "30ch",
};
