import { Flex, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { loginSchema } from "../../../schemas";
import { useAuth } from "../../../context/webContext";
import { Input } from "../../Input";
import { iUserLogin } from "../../../interface";

interface iStatusModalLoginProps {
  onClose: () => void;
}

export const FormLogin = ({ onClose }: iStatusModalLoginProps) => {
  const { onLogin } = useAuth();

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iUserLogin>({
    resolver: yupResolver(loginSchema),
  });

  const onFormSubmit = (formData: iUserLogin) => {
    onLogin(formData);

    setInputPassword("");
    setInputEmail("");
    onClose();
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
          id={"email"}
          errorMessage={errors.email?.message}
          label={"Email"}
          placeholder="Digite seu email"
          color={"black"}
          w={"100%"}
          register={register}
          bg_hover={"#e54c03d6"}
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
          bg_hover={"#e54c03d6"}
          color={"black"}
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
        bg={"#1c3462"}
        color={"white"}
        _hover={{
          bg: "#3c8aee",
          color: "black",
        }}
        type="submit"
      >
        Entrar
      </Button>
    </Flex>
  );
};
