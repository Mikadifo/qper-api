import Yup from "yup";

export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username too short")
    .max(50, "Username is too long")
    .matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, underscores allowed")
    .required("Username required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().required("Password required"),
});

export const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username required"),
  password: Yup.string().required("Password required"),
});
