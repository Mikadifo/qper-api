import Yup from "yup";

export const newProjectSchema = Yup.object().shape({
  name: Yup.string().required("Name required"),
});
