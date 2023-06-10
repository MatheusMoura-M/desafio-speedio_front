import { Flex, Image, Text, VStack } from "@chakra-ui/react";
import Header from "../../components/NavBar";
import Illus_Working from "../../assets/Illustration_working.png";
import { FormHome } from "../../components/Forms";

export const Home = () => {
  return (
    <Flex flexDir={"column"}>
      <Header />
      <Flex
        minH={"88vh"}
        w={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDir={{ base: "column-reverse", md: "row" }}
        mb={{ base: "3rem", md: 0 }}
      >
        <Flex
          w={{ base: "90%", md: "47%" }}
          justifyContent={"center"}
          alignItems={"flex-start"}
          pl={"4rem"}
          flexDir={"column"}
          gap={"3rem"}
        >
          <VStack alignItems={"flex-start"}>
            <Text fontWeight={700} fontSize={"44px"}>
              More readable and practical
            </Text>
            <Text fontWeight={400} color={"grey"} fontSize={"20px"}>
              Improve your brand awareness with shortened links
            </Text>
          </VStack>
          <FormHome />
        </Flex>
        <Flex
          w={{ base: "90%", md: "50%" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image src={Illus_Working} boxSize={520} />
        </Flex>
      </Flex>
    </Flex>
  );
};
