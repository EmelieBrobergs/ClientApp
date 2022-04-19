import { Box, Button, InputAdornment, TextField, Typography, useTheme } from "@mui/material";
import { Form, Formik } from "formik";
import * as React from "react";
import { CSSProperties, useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { styleResetMessages } from "../../../reduxSlices/styleSlice";
import validationsForm from "./validationSchema";

interface Values extends IEditStyleInfo { }

interface Props {
  // styleId: string | undefined;
  displayStyle: IStyle;
  onSubmit: (values: Values) => void;
  updateError: string | null;
  updateMessage: string | null;
}

export const InfoForm: React.FC<Props> = ({ displayStyle, onSubmit, updateError, updateMessage }) => {
  const theme = useTheme();
  // const { styleId } = useParams<"styleId">();
  // const displayStyle = useAppSelector(state => state.style.styles)?.find(s => s.id === styleId);
  const dispatch = useAppDispatch();

  var initialValues: Values = {
    originalStyle: displayStyle,
    assignedToUserId: displayStyle.assignedToUserId,
    styleNumber: displayStyle.styleNumber,
    orderNumber: displayStyle.orderNumber,
    name: displayStyle.name,
    description: displayStyle.description,
    productType: displayStyle.productType,
    productGroup: displayStyle.productGroup,
    tags: displayStyle.tags,
  };
  // var initialValues: Values = {
  //   originalStyle: displayStyle,
  //   assignedToUserId: displayStyle.assignedToUserId : undefined,
  //   styleNumber: displayStyle ? displayStyle.styleNumber : "",
  //   orderNumber: displayStyle ? displayStyle.orderNumber : "",
  //   name: displayStyle ? displayStyle.name : "",
  //   description: displayStyle ? displayStyle.description : "",
  //   productType: displayStyle ? displayStyle.productType : "",
  //   productGroup: displayStyle ? displayStyle.productGroup : "",
  //   tags: displayStyle ? displayStyle.tags : undefined,
  // };

  useEffect(() => {
    dispatch(styleResetMessages());
  }, []);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationsForm.validationsFormInfo}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {({ values, handleChange, handleBlur, touched, errors }) => (
          <Form>
            <div style={{ ...root }}>
              <Box sx={{
                maxWidth: 700,
                m: 1,
                borderRadius: 3,
                backgroundColor: theme.palette.secondary.main,
                '&:hover': {
                  backgroundColor: theme.palette.secondary.light,
                },
              }}
              >
                <TextField
                  fullWidth
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="input-style-name"
                  InputProps={{
                    disableUnderline: errors.name ? false : true,
                    startAdornment: (
                      <InputAdornment position="start" sx={{ ...label }}>
                        Name:
                      </InputAdornment>
                    ),
                  }}
                  sx={{ ml: 1, pr: 2 }}
                  variant="standard"
                  error={(touched.name && errors.name) ? true : false}
                  helperText={errors.name ? 'Requierd field' : ''}
                />
                <TextField
                  fullWidth
                  name="orderNumber"
                  value={values.orderNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="input-style-orderNumber"
                  InputProps={{
                    disableUnderline: errors.orderNumber ? false : true,
                    startAdornment: (
                      <InputAdornment position="start" sx={{ ...label }}>
                        Order No:
                      </InputAdornment>
                    ),
                  }}
                  sx={{ ml: 1, pr: 2 }}
                  variant="standard"
                  error={(touched.orderNumber && errors.orderNumber) ? true : false}
                  helperText={errors.orderNumber ? 'Requierd field' : ''}
                />
                <TextField
                  fullWidth
                  name="styleNumber"
                  value={values.styleNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="input-style-styleNumber"
                  InputProps={{
                    disableUnderline: errors.styleNumber ? false : true,
                    startAdornment: (
                      <InputAdornment position="start" sx={{ ...label }}>
                        Style No:
                      </InputAdornment>
                    ),
                  }}
                  sx={{ ml: 1, pr: 2 }}
                  variant="standard"
                  error={(touched.styleNumber && errors.styleNumber) ? true : false}
                  helperText={errors.styleNumber ? 'Requierd field' : ''}
                />
                <TextField
                  fullWidth
                  name="productType"
                  value={values.productType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="input-style-productType"
                  InputProps={{
                    disableUnderline: errors.productType ? false : true,
                    startAdornment: (
                      <InputAdornment position="start" sx={{ ...label }}>
                        Product type:
                      </InputAdornment>
                    ),
                  }}
                  sx={{ ml: 1, pr: 2 }}
                  variant="standard"
                  error={(touched.productType && errors.productType) ? true : false}
                  helperText={errors.productType ? 'Requierd field' : ''}
                />
                <TextField
                  fullWidth
                  name="productGroup"
                  value={values.productGroup}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="input-style-productGroup"
                  InputProps={{
                    disableUnderline: errors.productGroup ? false : true,
                    startAdornment: (
                      <InputAdornment position="start" sx={{ ...label }}>
                        Product group:
                      </InputAdornment>
                    ),
                  }}
                  sx={{ ml: 1, pr: 2 }}
                  variant="standard"
                  error={(touched.productGroup && errors.productGroup) ? true : false}
                  helperText={errors.productGroup ? 'Requierd field' : ''}
                />
              </Box>
              <Box sx={{
                maxWidth: 700,
                m: 1,
                borderRadius: 3,
                backgroundColor: theme.palette.secondary.main,
                '&:hover': {
                  backgroundColor: theme.palette.secondary.main
                },
              }}
              >
                <TextField
                  fullWidth
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="input-style-description"
                  InputProps={{
                    disableUnderline: errors.description ? false : true,
                    startAdornment: (
                      <InputAdornment position="start" sx={{ ...label }}>
                        Description:
                      </InputAdornment>
                    ),
                  }}
                  sx={{ ml: 1, pr: 2 }}
                  multiline
                  maxRows={6}
                  variant="standard"
                  error={(touched.description && errors.description) ? true : false}
                  helperText={errors.description ? 'Requierd field' : ''}
                />
              </Box>
              <div style={{ alignSelf: "flex-end" }}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ ...buttonStyle }}
                >
                  SAVE
                </Button>
                {updateMessage && !updateError &&
                  <div>
                    <Typography variant="subtitle1">Message: {updateMessage}</Typography>
                  </div>
                }
                {updateError &&
                  <div>
                    <Typography variant="subtitle1" color={theme.palette.error.main}>Error: {updateError}</Typography>
                  </div>
                }
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const root: CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const label: CSSProperties = {
  width: '10rem'
};

const buttonStyle: CSSProperties = {
  marginTop: 3,
  justifyContent: "center",
  fontWeight: "lighter",
  width: "30ch",
};
