import { Flex, Image, Heading, List, ListItem, Text } from "@chakra-ui/react";
import Header from "../../components/NavBar";
import Illus_Working from "../../assets/Illustration_working.png";
import { useAuth } from "../../context/webContext";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { api } from "../../services/api";

export const Top100 = () => {
  const getAllLinksByUseQuery = async () => {
    const resp = await api.get(`/link`);
    return resp.data;
  };

  const { data, status } = useQuery("links", getAllLinksByUseQuery);

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
          <Flex
            h={47}
            bg={"#3c8aee"}
            w={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
            borderTopRadius={".4rem"}
          >
            <Heading as={"h2"} size={"md"} color={"#1c3462"}>
              Top 100 de URLs mais visitadas
            </Heading>
          </Flex>
          <Flex
            h={25}
            bg={"gray.400"}
            w={"100%"}
            px={".5rem"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text w={"50%"} textAlign={"center"}>
              Titúlo
            </Text>
            <Text w={{ base: "25%", xs1: "15%" }} textAlign={"center"}>
              Visitas
            </Text>
          </Flex>
          <Flex
            h={"90%"}
            w={"100%"}
            minH={"max-content"}
            maxH={340}
            p={"0 12px 10px 12px"}
            bg={"gray.300"}
            borderBottomRadius={".4rem"}
          >
            {status === "success" && (
              <List
                overflowY={"auto"}
                overflowX={"hidden"}
                w={"100%"}
                h={"100%"}
                sx={{
                  "::-webkit-scrollbar": {
                    w: "10px",
                    h: "12px",
                  },
                  "::-webkit-scrollbar-track": {
                    bg: "#1c3462",
                    borderRadius: "10px",
                    w: "10px",
                  },
                  "::-webkit-scrollbar-thumb": {
                    bg: "#3c8aee",
                    borderRadius: "24px",
                  },
                }}
              >
                {data.length === 0 ? (
                  <Flex
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    fontSize={"30px"}
                    fontWeight={500}
                    h={"100%"}
                  >
                    Sem URLs encurtadas
                  </Flex>
                ) : (
                  data.map((link: any, i: any) => {
                    return (
                      <ListItem
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-around"}
                        key={link.id}
                        h={45}
                      >
                        <Text
                          w={"90%"}
                          borderBottom={"1px solid black"}
                          textOverflow={"ellipsis"}
                          whiteSpace={"nowrap"}
                          overflow={"hidden"}
                          h={"100%"}
                          pt={"10px"}
                        >
                          {i + 1 + "º) "} {link.title}
                        </Text>
                        <Text
                          w={{ base: "20%", xs1: "10%" }}
                          h={"100%"}
                          textAlign={"center"}
                          borderLeft={"1px solid black"}
                          pt={"10px"}
                        >
                          {link.visits}
                        </Text>
                      </ListItem>
                    );
                  })
                )}
              </List>
            )}
          </Flex>
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
