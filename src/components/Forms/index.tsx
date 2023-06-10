import { Flex, Input, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { shortenLinkSchema } from "../../schemas";

export const FormHome = () => {
  const [inputSearch, setInputSearch] = useState("");

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(shortenLinkSchema),
  });

  const onFormSubmit = (formData: any) => {
    console.log(formData);
  };

  return (
    <Flex
      as={"form"}
      w={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      bg={"#1c3462"}
      p={"1rem"}
      borderRadius={".5rem"}
      gap={"1rem"}
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <Input
        placeholder="Insira um link aqui..."
        bg={"white"}
        border={"none"}
        color={"black"}
        w={"80%"}
        {...register("link")}
        _placeholder={{
          color: "grey.2",
        }}
        onChange={(e) => {
          setInputSearch(e.target.value);
        }}
        value={inputSearch}
      />
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
