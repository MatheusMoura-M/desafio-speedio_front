import {
  Box,
  Flex,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { iLinkResponse, iStatusModal } from "../../../interface";
import { useAuth } from "../../../context/webContext";
import { LinkIcon, EditIcon, DeleteIcon, CopyIcon } from "@chakra-ui/icons";
import ModalEditLinks from "./editLinks";

const ModalLinks = ({ isOpen, onClose }: iStatusModal) => {
  const { allLinksByUser, onDeleteShortenedLink } = useAuth();
  const [currentLink, setCurrentLink] = useState({} as iLinkResponse);
  const [activeCopy, setActiveCopy] = useState(false);

  const {
    onOpen: onOpenEdit,
    isOpen: isOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        alignSelf={"center"}
        bg={"#f4943e"}
        w={"90%"}
        minW={{ base: "90%", md: 700 }}
        minH={"max-content"}
        maxH={480}
      >
        <ModalHeader
          fontSize={"16px"}
          color={"black"}
          bg={"#e54c03"}
          borderTopRadius={"md"}
        >
          Links
        </ModalHeader>
        <Flex flexDir={"column"}>
          <ModalCloseButton />
          <ModalBody p={"24px"} w={"100%"}>
            <List
              spacing={8}
              minH={"max-content"}
              maxH={340}
              overflowY={"auto"}
              overflowX={"hidden"}
              sx={{
                "::-webkit-scrollbar": {
                  w: "10px",
                  h: "12px",
                },
                "::-webkit-scrollbar-track": {
                  bg: "#fc7637",
                  borderRadius: "10px",
                  w: "10px",
                },
                "::-webkit-scrollbar-thumb": {
                  bg: "#f3ae8d",
                  borderRadius: "24px",
                },
              }}
            >
              {allLinksByUser.length === 0 ? (
                <Text textAlign={"center"} fontWeight={500} fontSize={"24px"}>
                  Lista vazia 😕
                </Text>
              ) : (
                allLinksByUser.map((link) => {
                  return (
                    <ListItem
                      flexDir={"row"}
                      key={link.id}
                      maxW={{ base: "90%", sm: "97%", md: "100%" }}
                    >
                      <Flex alignItems={"center"} w={"100%"}>
                        <Flex display={"inline-block"}>
                          <ListIcon as={LinkIcon} boxSize={5} />
                        </Flex>
                        <Flex flexDir={"column"} h={"100%"} w={"85%"}>
                          <Text color={"grey.0"} fontWeight={500}>
                            Titúlo:{" "}
                            <Text
                              as={"span"}
                              color={"gray.900"}
                              fontWeight={400}
                            >
                              {link.title}
                            </Text>
                          </Text>
                          <Text
                            textOverflow={"ellipsis"}
                            whiteSpace={"nowrap"}
                            overflow={"hidden"}
                            color={"grey.0"}
                            fontWeight={500}
                          >
                            Link original:{" "}
                            <Text
                              as={"span"}
                              color={"gray.900"}
                              fontWeight={400}
                            >
                              {link.original_link}
                            </Text>
                          </Text>
                          <Text color={"grey.0"} fontWeight={500}>
                            Link encurtado:{" "}
                            <Text
                              as={"span"}
                              color={"gray.900"}
                              fontWeight={400}
                            >
                              {link.shortened_link}
                            </Text>{" "}
                            &nbsp;
                            <Text
                              as={"span"}
                              position={"relative"}
                              display={"inline-block"}
                            >
                              <CopyIcon
                                cursor={"pointer"}
                                transition={".3s"}
                                _hover={{
                                  transform: "scale(1.1)",
                                  transition: ".3s",
                                }}
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    window.location.href.replace("top100", "") +
                                      link.shortened_link
                                  );
                                  setActiveCopy(true);
                                  setCurrentLink(link);
                                  setTimeout(() => {
                                    setActiveCopy(false);
                                  }, 800);
                                }}
                              />
                              <Text
                                as={"span"}
                                display={
                                  activeCopy && currentLink.id == link.id
                                    ? "flex"
                                    : "none"
                                }
                                color={"black"}
                                fontWeight={700}
                                fontSize={"12px"}
                                bg={"white"}
                                px={1}
                                borderTopRadius={"10px"}
                                borderEndRadius={"10px"}
                                position={"absolute"}
                                top={"-10px"}
                                right={"-50px"}
                              >
                                Copiado
                              </Text>
                            </Text>
                          </Text>
                          <Text color={"grey.0"} fontWeight={500}>
                            Visitas:{" "}
                            <Text
                              as={"span"}
                              color={"gray.900"}
                              fontWeight={400}
                            >
                              {link.visits}
                            </Text>
                          </Text>
                        </Flex>
                        <VStack spacing={5}>
                          <ListIcon
                            as={EditIcon}
                            cursor={"pointer"}
                            boxSize={5}
                            transition={".2s"}
                            _hover={{
                              transform: "scale(1.1)",
                              transition: ".2s",
                            }}
                            onClick={() => {
                              onOpenEdit();
                              setCurrentLink(link);
                            }}
                          />
                          <ListIcon
                            as={DeleteIcon}
                            cursor={"pointer"}
                            boxSize={5}
                            transition={".2s"}
                            _hover={{
                              transform: "scale(1.1)",
                              transition: ".2s",
                            }}
                            onClick={() => onDeleteShortenedLink(link.id)}
                          />
                        </VStack>
                      </Flex>
                    </ListItem>
                  );
                })
              )}
            </List>
          </ModalBody>
        </Flex>
      </ModalContent>
      <ModalEditLinks
        onClose={onCloseEdit}
        isOpen={isOpenEdit}
        elem={currentLink}
      />
    </Modal>
  );
};

export default ModalLinks;
