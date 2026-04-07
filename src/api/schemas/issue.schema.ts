import Yup from "yup";

export const newIssueSchema = Yup.object().shape({
  title: Yup.string().required("Title required"),
  description: Yup.string().required("Description required"),
});
