import { Flex, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { shortenLinkSchema } from "../../schemas";
import { useAuth } from "../../context/webContext";

export const FormHome = () => {
  const { onShortenLink } = useAuth();

  const [inputTitle, setInputTitle] = useState("");
  const [inputLink, setInputLink] = useState("");

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(shortenLinkSchema),
  });

  const onFormSubmit = (formData: any) => {
    onShortenLink(formData);

    setInputLink("");
    setInputTitle("");
  };

  return (
    <Flex
      as={"form"}
      w={"100%"}
      m={"2rem 0 0.5rem 0"}
      justifyContent={"center"}
      alignItems={"flex-end"}
      bg={"#1c3462"}
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
        <FormControl>
          <FormLabel color={"gray.100"}>Titúlo</FormLabel>
          <Input
            placeholder="Insira um titúlo aqui..."
            bg={"white"}
            border={"none"}
            color={"black"}
            w={"100%"}
            {...register("title")}
            _placeholder={{
              color: "grey.2",
            }}
            onChange={(e) => {
              setInputTitle(e.target.value);
            }}
            value={inputTitle}
          />
        </FormControl>
        <FormControl>
          <FormLabel color={"gray.100"}>Link</FormLabel>
          <Input
            placeholder="Insira um link aqui..."
            bg={"white"}
            border={"none"}
            color={"black"}
            w={"100%"}
            {...register("original_link")}
            _placeholder={{
              color: "grey.2",
            }}
            onChange={(e) => {
              setInputLink(e.target.value);
            }}
            value={inputLink}
          />
        </FormControl>
      </Flex>
      <Button
        bg={"#3c8aee"}
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
