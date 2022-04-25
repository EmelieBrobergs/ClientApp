import { Autocomplete, Box, Button, Chip, InputAdornment, TextField, Typography, useTheme } from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import * as React from "react";
import { CSSProperties, useEffect } from "react";
import { useParams } from 'react-router';
import { useAppDispatch } from '../../../../app/hooks';
import { measurementResetMessages } from '../../../../reduxSlices/measurementSlice';

import validationsForm from "./validationSchema";

interface Values extends ICreateMeasurement { }

interface Props {
  onSubmit: (values: Values) => void;
  styleId: string;  //NOTE: Will this always right Id be provided. Ex. if page is reloded ?
  updateError: string | null;
  updateMessage: string | null;
}

export const CreateMeasurementForm: React.FC<Props> = ({ onSubmit, styleId, updateError, updateMessage }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [sizes, setSizes] = React.useState<ICreateSizes[]>([]);
  const [selectedBaseSize, setSelectedBaseSize] = React.useState<string | null>(sizes.length > 0 ? sizes[0].name : null);

  var initialValues: Values = {
    id: 0,
    styleId: styleId,
    name: '',
    sizeRange: {
      id: 0,
      baseSizeName: selectedBaseSize,
      sizes: sizes,
    }
  };

  useEffect(() => {
    dispatch(measurementResetMessages());
    console.log("effect körs med: []");
  }, []);

  useEffect(() => {
    setSelectedBaseSize(null);
  }, [sizes.length === 0]);

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
                py: 1,
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
                  id="input-measurement-name"
                  label="Measurement Name:"
                  sx={{ ml: 1, pr: 2 }}
                  variant="standard"
                  error={(touched.name && errors.name) ? true : false}
                  helperText={errors.name ? 'Requierd field' : ''}
                />
                <Autocomplete
                  multiple
                  id="input-sizes"
                  options={[]}
                  onChange={(event: any, newArrayValue: string[]) => {
                    var resultInput: ICreateSizes[] = [];
                    newArrayValue.forEach((input, index) => {
                      resultInput.push({
                        id: 0,
                        name: input,
                        orderIndex: (index + 1).toString()
                      });
                    });
                    values.sizeRange.sizes = resultInput;
                    return setSizes(resultInput);
                  }}
                  freeSolo={true}
                  renderTags={(value: readonly string[]) =>
                    value.map((option: string, index: number) => (
                      <Chip
                        label={option}
                        sx={{
                          mr: 1,
                          backgroundColor: (option === selectedBaseSize) ? theme.palette.success.main : theme.palette.common.white,
                          color: (option === selectedBaseSize) ? theme.palette.success.light : ''
                        }}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      name="sizes"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Size Range:"
                      sx={{ my: 1, ml: 1, pr: 2 }}
                      variant="standard"
                      error={(touched.sizeRange?.sizes && errors.sizeRange?.sizes && (sizes.length === 0)) ? true : false}
                      helperText={(errors.sizeRange?.sizes && (sizes.length === 0)) ? 'Requierd field' : ''}
                    />
                  )}
                />
                <Autocomplete
                  value={selectedBaseSize}
                  onChange={(event: any, newValue: string | null) => {
                    console.log("base size: " + newValue);
                    setSelectedBaseSize(newValue);
                    values.sizeRange.baseSizeName = newValue;
                  }}
                  id="base-size-name"
                  options={sizes.map((option) => option.name)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      name="baseSizeName"
                      label="Select Base Size"
                      sx={{ ml: 1, pr: 2 }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="standard"
                      error={(touched.sizeRange?.baseSizeName && errors.sizeRange?.baseSizeName) ? true : false}
                      helperText={errors.sizeRange?.baseSizeName ? 'Requierd field' : ''}
                    />
                  )}
                />
              </Box>
              <br />
              {sizes.map((item, index) => <p>{item.name} : {item.orderIndex} : {index}</p>)}
              <div>{`value: ${sizes.length !== 0 ? `'${sizes.length}'` : 'null'}`}</div>
              <br />
              <div style={{ alignSelf: "flex-end" }}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ ...buttonStyle }}
                >
                  CREATE
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


// NOTE: Dessa följde med vid kopiering av fil, dvs, dublicerad styling kod nu...
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
