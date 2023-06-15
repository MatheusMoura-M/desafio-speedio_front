import { Flex, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { shortenLinkSchema } from "../../../schemas";
import { useAuth } from "../../../context/webContext";
import { iLinkRequest } from "../../../interface";
import { Input } from "../../Input";

export const FormHome = () => {
  const { onShortenLink, setAppear } = useAuth();

  const [inputTitle, setInputTitle] = useState("");
  const [inputLink, setInputLink] = useState("");

  const sumir = () => {
    setAppear(true);
    setTimeout(() => {
      setAppear(false);
    }, 5000);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iLinkRequest>({
    resolver: yupResolver(shortenLinkSchema),
  });

  const onFormSubmit = (formData: iLinkRequest) => {
    onShortenLink(formData);

    setInputLink("");
    setInputTitle("");
    sumir();
  };

  return (
    <Flex
      as={"form"}
      w={"100%"}
      m={"2rem 0 0.5rem 0"}
      justifyContent={"center"}
      alignItems={"flex-end"}
      bg={"blue.1"}
      p={"1rem"}
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
          id={"title"}
          errorMessage={errors.title?.message}
          label={"Titúlo"}
          label_color={"gray.100"}
          register={register}
          placeholder="Insira um titúlo aqui..."
          bg={"white"}
          bg_hover={"gray.300"}
          border={"none"}
          color={"black"}
          w={"100%"}
          _placeholder={{
            color: "grey.2",
          }}
          onChange={(e) => {
            setInputTitle(e.target.value);
          }}
          value={inputTitle}
        />

        <Input
          id={"original_link"}
          errorMessage={errors.original_link?.message}
          label={"Link"}
          label_color={"gray.100"}
          register={register}
          placeholder="Insira um link aqui..."
          bg={"white"}
          bg_hover={"gray.300"}
          border={"none"}
          color={"black"}
          w={"100%"}
          _placeholder={{
            color: "grey.2",
          }}
          onChange={(e) => {
            setInputLink(e.target.value);
          }}
          value={inputLink}
        />
      </Flex>
      <Button
        bg={"blue.2"}
        _hover={{
          bg: "#87a8d3",
        }}
        type="submit"
      >
        Encurtar
      </Button>
    </Flex>
  );
};
