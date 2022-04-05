import * as yup from "yup";

const validationsFormInfo = yup.object().shape({
  styleNumber: yup.string().required("Requierd"),
  orderNumber: yup.string().required("Requierd"),
  name: yup.string().required("Requierd"),
  description: yup.string().required("Requierd"),
  productType: yup.string().required("Requierd"),
  productGroup: yup.string().required("Requierd"),
});

export default {
  validationsFormInfo
};

