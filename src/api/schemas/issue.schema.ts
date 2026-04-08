import Yup from "yup";

export const newIssueSchema = Yup.object().shape({
  title: Yup.string().required("Title required"),
  description: Yup.string().required("Description required"),
  steps: Yup.string().required("Steps required"),
  expectedResult: Yup.string().required("Expected Result required"),
  actualResult: Yup.string().required("Actual Result required"),
});
