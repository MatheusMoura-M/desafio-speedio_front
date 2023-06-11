import * as yup from "yup";
import { iLinkRequest, iUserLogin, iUserRequest } from "../interface";

export const shortenLinkSchema: yup.SchemaOf<iLinkRequest> = yup
  .object()
  .shape({
    original_link: yup.string().required("Campo obrigatório"),
    title: yup.string().required("Campo obrigatório"),
  });

export const loginSchema: yup.SchemaOf<iUserLogin> = yup.object().shape({
  email: yup
    .string()
    .email("Deve ser um email válido")
    .required("Campo obrigatório"),
  password: yup.string().required("Campo obrigatório"),
});

export const registerSchema: yup.SchemaOf<iUserRequest> = yup.object().shape({
  name: yup.string().required("Campo obrigatório"),
  email: yup
    .string()
    .email("Deve ser um email válido")
    .required("Campo obrigatório"),
  password: yup.string().required("Campo obrigatório"),
});
