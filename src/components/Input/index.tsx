import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputLeftElement,
  InputGroup,
  InputRightElement,
  Box,
  Text,
} from "@chakra-ui/react";
import { InputProps, iShowPass } from "../../interface";
import { ReactNode, useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export const Input = ({
  errorMessage,
  icon: Icon,
  label,
  variant,
  height,
  register,
  id,
  type,
  formWidth,
  marginTopForm,
  showPass,
  value,
  label_color,
  bg_hover,
  ...rest
}: InputProps) => {
  const [show, setShow] = useState(false);
  const [passType, setPassType] = useState("password");
  const [isError, setIsError] = useState(false);

  const { onBlur, name, ref } = register!(id);
  // Validations
  const inputType = showPass ? passType : type;
  const [isActiveError, setIsActiveError] = useState(false);

  const showPassword = ({ showPass }: iShowPass): ReactNode => {
    if (value !== "" && showPass) {
      const whichEye =
        show === false ? (
          <AiFillEyeInvisible size={22} color="#030303" />
        ) : (
          <AiFillEye size={22} color="#030303" />
        );

      const passType = show === false ? "text" : "password";

      return (
        <Box
          className="showPass"
          onClick={() => {
            setShow(!show);
            setPassType(passType);
          }}
          role="button"
        >
          {whichEye}
        </Box>
      );
    }
  };

  useEffect(() => {
    value !== "" && setIsActiveError(true);
    if (isActiveError) {
      value === "" ? setIsError(true) : setIsError(false);
    }
  }, [value]);

  return (
    <FormControl mt={marginTopForm} width={formWidth} isInvalid={isError}>
      {!!label && (
        <FormLabel fontSize="0.875rem" color={label_color}>
          {label}
        </FormLabel>
      )}

      <InputGroup flexDir={"column"}>
        {Icon && (
          <InputLeftElement mt={2.5}>
            <Icon />
          </InputLeftElement>
        )}
        <ChakraInput
          id={id}
          onBlur={onBlur}
          name={name}
          ref={ref}
          value={value}
          type={inputType}
          bg={"transparent"}
          border={"1px solid"}
          borderColor={"gray.800"}
          borderRadius={"4px"}
          variant={variant}
          _focusVisible={{
            border: "none",
            bg: bg_hover,
          }}
          _hover={{
            bg: bg_hover,
            borderColor: "transparent",
          }}
          _placeholder={{ color: "grey.3" }}
          size={"md"}
          h={height}
          maxH={{ base: 128, xsm2: 75 }}
          _focus={{
            borderColor: "brand.2",
            bg: "grey.10",
          }}
          {...rest}
        />
        {showPass === true ? (
          <InputRightElement>{showPassword({ showPass })}</InputRightElement>
        ) : null}
        {isError ||
          (errorMessage && (
            <Text
              color={"alert.1"}
              mt={"5px"}
              fontSize={"12px"}
              ml={
                errorMessage === "Comentário obrigatório"
                  ? { base: "unset", xsm2: "10px" }
                  : "unset"
              }
            >
              {errorMessage}
            </Text>
          ))}
      </InputGroup>
    </FormControl>
  );
};
