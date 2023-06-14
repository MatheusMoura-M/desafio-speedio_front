import { Path, UseFormRegister } from "react-hook-form";
import { InputProps as ChakraInputProps } from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface iShowPass {
  showPass: boolean | undefined;
}

export interface InputProps extends ChakraInputProps {
  id: Path<any>;
  register: UseFormRegister<any>;
  errorMessage?: string;
  label?: string;
  icon?: IconType;
  variant?: string;
  height?: string;
  formWidth?: string;
  type?: string;
  showPass?: boolean;
  showConfirmPass?: boolean;
  marginTopForm?: string;
  value?: string | number;
  label_color?: string;
  bg_hover?: string;
}
