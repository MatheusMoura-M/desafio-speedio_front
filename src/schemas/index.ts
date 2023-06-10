import * as yup from "yup";
import { iLinkRequest } from "../interface";

export const shortenLinkSchema: yup.SchemaOf<iLinkRequest> = yup
  .object()
  .shape({
    original_link: yup.string().required("Campo obrigatório"),
    title: yup.string().required("Campo obrigatório"),
  });
