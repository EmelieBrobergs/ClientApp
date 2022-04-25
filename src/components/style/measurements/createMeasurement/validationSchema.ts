import * as yup from "yup";

const validationsFormInfo = yup.object().shape({
  name: yup.string().required("Requierd"),
  sizeRange: yup.object().shape({
    sizes: yup.array().min(1, "Minimum one size").required("Requierd"), //of type IInputSizes
    baseSizeName: yup.string().required("Requierd"),
  })
});

export default {
  validationsFormInfo
};

