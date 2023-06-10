import { Search2Icon } from "@chakra-ui/icons";
import { Box, Button, Flex, HStack, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Header = () => {
  const searchCitySchema = yup.object().shape({
    city: yup.string().required("Campo obrigatório"),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(searchCitySchema),
  });

  const onFormSubmit = (formData: any) => {
    console.log(formData);
  };

  return (
    <Box
      id="header"
      // bg={"#196db657"}
      pl={{ base: "10px", md: "20px", lg: "40px" }}
      minH={"70px"}
      h={"10vh"}
      w={"100%"}
      maxW={1520}
      margin={"0 auto"}
      borderBottom={"2px solid"}
      borderColor={"grey.5"}
    >
      <Flex h={"100%"} w={"95%"} justifyContent={"space-between"}>
        <Flex alignItems={"center"} justifyContent={"center"} minW={180}>
          <Text
            minW={150}
            h={40.1}
            fontSize={"26px"}
            fontWeight={"bold"}
            textShadow={"#00000069 0.1em 0.1em 0.2em"}
            cursor={"pointer"}
          >
            Link Shortener
          </Text>
        </Flex>
        <Flex
          w={"50%"}
          minW={130}
          minH={"90%"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          gap={{ base: "1rem", md: "3rem" }}
        >
          <Button
            bg={"#f4943e"}
            type="submit"
            borderRadius={"2rem"}
            transition={"0.3s"}
            _hover={{
              transition: "0.3s",
              bg: "#e54c03",
              color: "white",
            }}
          >
            Login
          </Button>
          <Button
            bg={"#f4943e"}
            borderRadius={"2rem"}
            type="submit"
            transition={"0.3s"}
            _hover={{
              transition: "0.3s",
              bg: "#e54c03",
              color: "white",
            }}
          >
            Sign up
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;