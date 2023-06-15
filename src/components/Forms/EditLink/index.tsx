import { Flex, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { editLinkSchema } from "../../../schemas";
import { useAuth } from "../../../context/webContext";
import { Input } from "../../Input";
import { iLinkResponse, iLinkUpdate } from "../../../interface";

interface iStatusModalLoginProps {
  onClose: () => void;
  elem: iLinkResponse;
}

export const FormEditLink = ({ onClose, elem }: iStatusModalLoginProps) => {
  const { onUpdateShortenedLink } = useAuth();
  const [inputTitle, setInputTitle] = useState(elem.title!);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iLinkUpdate>({
    resolver: yupResolver(editLinkSchema),
  });

  const onFormSubmit = (formData: iLinkUpdate) => {
    onUpdateShortenedLink(formData, elem.id);

    setInputTitle("");
    onClose();
  };

  return (
    <Flex
      as={"form"}
      w={"100%"}
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
          id={"title"}
          errorMessage={errors.title?.message}
          label={"Titúlo"}
          placeholder="Digite o titúlo"
          color={"black"}
          w={"100%"}
          register={register}
          bg_hover={"orange.3"}
          _placeholder={{
            color: "black",
          }}
          onChange={(e) => {
            setInputTitle(e.target.value);
          }}
          value={inputTitle}
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
        Editar
      </Button>
    </Flex>
  );
};
