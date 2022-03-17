import * as yup from "yup";

const validationsForm = yup.object().shape({
  email: yup.string().required("Enter username"),
  password: yup.string().required("Enter password"),
  // confirmLogin: yup.boolean("Password or username is not right"),
});

export default validationsForm;

