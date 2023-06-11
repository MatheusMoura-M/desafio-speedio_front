import { Button, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import Header from "../../components/NavBar";
import Illus_Working from "../../assets/Illustration_working.png";
import { FormHome } from "../../components/Forms/Home";
import { useAuth } from "../../context/webContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const Home = () => {
  const { currentLink, getShortenedLinkSpecific } = useAuth();
  const { link } = useParams();

  useEffect(() => {
    if (link) {
      getShortenedLinkSpecific(link);
    }
  }, []);

  return (
    <Flex flexDir={"column"}>
      <Header />
      <Flex
        minH={"88vh"}
        w={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDir={{ base: "column-reverse", md1: "row" }}
        mb={{ base: "3rem", md1: 0 }}
      >
        <Flex
          w={{ base: "90%", md1: "47%" }}
          h={475}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          pl={{ base: 0, md1: "4rem" }}
          flexDir={"column"}
        >
          <VStack alignItems={"flex-start"} minH={200}>
            <Text fontWeight={700} fontSize={"44px"}>
              More readable and practical
            </Text>
            <Text fontWeight={400} color={"grey"} fontSize={"20px"}>
              Improve your brand awareness with shortened links
            </Text>
          </VStack>
          <FormHome />
          {currentLink.original_link && (
            <Flex
              bg={"#f4943e"}
              maxW={"100%"}
              minH={95}
              borderRadius={".5rem"}
              justifyContent={"space-between"}
              alignItems={"flex-end"}
              px={"1rem"}
            >
              <VStack
                w={"100%"}
                h={"100%"}
                justifyContent={"center"}
                alignItems={"flex-start"}
                gap={0}
              >
                <Flex
                  maxW={"100%"}
                  minW={"100%"}
                  borderBottom={"1px solid black"}
                  h={"50%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text maxW={100} minW={98} color={"grey.0"} fontWeight={500}>
                    Link original:&nbsp;
                  </Text>
                  <Text
                    as={"span"}
                    maxW={"max-content"}
                    display={"inline-block"}
                    color={"gray.900"}
                    fontWeight={400}
                    textOverflow={"ellipsis"}
                    whiteSpace={"nowrap"}
                    overflow={"hidden"}
                  >
                    {currentLink.original_link}
                  </Text>
                </Flex>
                <HStack
                  maxW={"100%"}
                  minW={"100%"}
                  h={"50%"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Flex maxW={"80%"}>
                    <Text
                      display={"flex"}
                      alignItems={"center"}
                      h={"40%"}
                      maxW={120}
                      minW={117}
                      color={"grey.0"}
                      fontWeight={500}
                    >
                      Link Encurtado:&nbsp;
                    </Text>
                    <Text
                      as={"span"}
                      color={"gray.900"}
                      fontWeight={400}
                      textOverflow={"ellipsis"}
                      whiteSpace={"nowrap"}
                      overflow={"hidden"}
                    >
                      {window.location.href + currentLink.shortened_link}
                    </Text>
                  </Flex>
                  <Button
                    h={"80%"}
                    border={"2px solid"}
                    bg={"transparent"}
                    transition={".3s"}
                    px={".5rem"}
                    _hover={{
                      bg: "#ffb05d",
                      transition: ".3s",
                    }}
                    onClick={(e) => {
                      (e.target as HTMLButtonElement).innerHTML = "Copiado";
                      setTimeout(() => {
                        (e.target as HTMLButtonElement).innerHTML = "Copiar";
                      }, 1500);
                      navigator.clipboard.writeText(
                        window.location.href + currentLink.shortened_link
                      );
                    }}
                  >
                    Copiar
                  </Button>
                </HStack>
              </VStack>
            </Flex>
          )}
        </Flex>
        <Flex
          w={{ base: "90%", md1: "50%" }}
          h={475}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image src={Illus_Working} boxSize={475} />
        </Flex>
      </Flex>
    </Flex>
  );
};
