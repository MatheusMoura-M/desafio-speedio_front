import * as yup from "yup";
import { iLink } from "../interface";

export const shortenLinkSchema: yup.SchemaOf<iLink> = yup.object().shape({
  link: yup.string().required("Campo obrigatório"),
});
