import * as yup from "yup";

export const LoginPasswordSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});
