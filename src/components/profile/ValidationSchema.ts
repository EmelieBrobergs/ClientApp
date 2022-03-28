import * as yup from "yup";

const validationsFormProfile = yup.object().shape({
  firstName: yup.string().required("Requierd"),
  lastName: yup.string().required("Requierd"),
});
const validationsFormPassword = yup.object().shape({
  oldPass: yup.string().required("Requierd"),
  newPassFirst: yup.string().required("Requierd"),
  newPassSecond: yup.string().oneOf([yup.ref('newPassFirst'), null], 'Passwords must match')
});

export default {
  validationsFormProfile, 
  validationsFormPassword
};

