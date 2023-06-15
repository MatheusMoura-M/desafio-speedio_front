import { Flex, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { registerSchema } from "../../../schemas";
import { useAuth } from "../../../context/webContext";
import { Input } from "../../Input";
import { iUserRequest } from "../../../interface";

interface iStatusModalRegisterProps {
  onClose: () => void;
  onOpen: () => void;
}

export const FormRegister = ({
  onClose,
  onOpen: onOpenLogin,
}: iStatusModalRegisterProps) => {
  const { onRegisterSubmit } = useAuth();

  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iUserRequest>({
    resolver: yupResolver(registerSchema),
  });

  const onFormSubmit = (formData: iUserRequest) => {
    onRegisterSubmit(formData);

    setInputName("");
    setInputEmail("");
    setInputPassword("");
    onClose();
    onOpenLogin();
  };
  return (
    <Flex
      as={"form"}
      w={"100%"}
      m={"2rem 0 0.5rem 0"}
      justifyContent={"center"}
      alignItems={"flex-end"}
      borderRadius={".5rem"}
      gap={"1rem"}
      onSubmit={handleSubmit(onFormSubmit)}
      flexDir={{ base: "column", md: "row" }}
    >
      <Flex
        flexDir={"column"}
        w={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"1rem"}
      >
        <Input
          id={"name"}
          errorMessage={errors.name?.message}
          label={"Nome"}
          placeholder="Digite seu nome"
          color={"black"}
          w={"100%"}
          bg_hover={"orange.3"}
          register={register}
          _placeholder={{
            color: "black",
          }}
          onChange={(e) => {
            setInputName(e.target.value);
          }}
          value={inputName}
        />
        <Input
          id={"email"}
          errorMessage={errors.email?.message}
          label={"Email"}
          register={register}
          placeholder="Digite seu email"
          color={"black"}
          bg_hover={"orange.3"}
          w={"100%"}
          _placeholder={{
            color: "black",
          }}
          onChange={(e) => {
            setInputEmail(e.target.value);
          }}
          value={inputEmail}
        />
        <Input
          id={"password"}
          errorMessage={errors.password?.message}
          label={"Senha"}
          type={"password"}
          register={register}
          showPass
          placeholder="Digite sua senha"
          color={"black"}
          bg_hover={"orange.3"}
          w={"100%"}
          _placeholder={{
            color: "black",
          }}
          onChange={(e) => {
            setInputPassword(e.target.value);
          }}
          value={inputPassword}
        />
      </Flex>
      <Button
        bg={"blue.1"}
        color={"white"}
        _hover={{
          bg: "blue.2",
          color: "black",
        }}
        type="submit"
      >
        Registrar
      </Button>
    </Flex>
  );
};
