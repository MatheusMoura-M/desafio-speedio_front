import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Show,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ModalLogin from "../Modals/Login";
import ModalRegister from "../Modals/Register";
import { useAuth } from "../../context/webContext";
import ModalLinks from "../Modals/Links/listLinks";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useEffect } from "react";

const Header = () => {
  const {
    getUserLinks,
    MenuHamburguer,
    isOpenLogin,
    onOpenLogin,
    onCloseLogin,
    isOpenRegister,
    onOpenRegister,
    onCloseRegister,
    isOpenLinks,
    onOpenLinks,
    onCloseLinks,
    isLogged,
    token,
    setIsLogged,
    userLogged,
    getUserProfile,
  } = useAuth();

  const BtnsDefault = ["Entrar", "Registrar"];
  const BtnsIsLogged = ["Meus links", "Sair"];

  useEffect(() => {
    if (token) {
      getUserProfile();
    } else {
      setIsLogged(false);
    }
  }, [token]);

  return (
    <Box
      id="header"
      pl={{ base: "10px", md: "20px", lg: "40px" }}
      minH={"70px"}
      h={"10vh"}
      w={"100%"}
      maxW={1520}
      margin={"0 auto"}
      borderBottom={"2px solid"}
      borderColor={"grey.5"}
    >
      <Flex h={"100%"} justifyContent={"space-between"}>
        <Flex
          alignItems={"center"}
          justifyContent={"flex-start"}
          minW={"60%"}
          w={"50%"}
          gap={"1rem"}
        >
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
          {isLogged && (
            <Show breakpoint="(min-width: 640px)">
              <Text
                minW={150}
                h={"max-content"}
                textAlign={"center"}
                fontSize={"17px"}
                fontWeight={400}
                cursor={"pointer"}
                onClick={() => {
                  onOpenLinks();
                  getUserLinks();
                }}
              >
                Meus links
              </Text>
            </Show>
          )}
        </Flex>
        {isLogged ? (
          // MENU HAMBURGUER IS LOGGED
          <>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"hamburguer"}
                cursor={"pointer"}
                maxW={200}
                minH={"100%"}
                px={0}
              >
                <HStack
                  display={"flex"}
                  alignItems={"center"}
                  gap={[null, ".5rem"]}
                  borderLeft={"2px solid"}
                  borderColor={"grey.6"}
                  minH={"78px"}
                  pl={[".5rem", "1rem", null, null]}
                  pr={[".5rem", "1rem", null, "1.7rem"]}
                >
                  <Image
                    w={[30, 35, null, 45]}
                    src={"https://encurtador.com.br/dmwCE"}
                    alt="Image profile"
                    borderRadius={"full"}
                    h={"100%"}
                    objectFit={"cover"}
                  />
                  <Text
                    color={"grey.2"}
                    fontWeight={"400"}
                    fontSize={["14px", "15px", "16px"]}
                    textOverflow={"ellipsis"}
                    whiteSpace={"nowrap"}
                    overflow={"hidden"}
                  >
                    {userLogged.name}
                  </Text>
                </HStack>
              </MenuButton>
              <MenuList
                display={"flex"}
                flexDir={"column"}
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
                borderTopRadius={"0rem"}
                borderBottomRadius={".5rem"}
                maxH={"max-content"}
                minW={["14.5rem", "16.5rem"]}
                bg={"gray.100"}
                pt={"0px"}
                pb={{ base: ".5rem", sm2: "0rem" }}
              >
                {BtnsIsLogged.map((link) => (
                  <MenuHamburguer key={link}>{link}</MenuHamburguer>
                ))}
              </MenuList>
            </Menu>
          </>
        ) : (
          // MENU HAMBURGUER IS NOT LOGGED
          <>
            <Show breakpoint="(min-width: 641px)">
              <Flex
                w={"40%"}
                minW={130}
                minH={"90%"}
                alignItems={"center"}
                justifyContent={"flex-end"}
                gap={{ base: "1rem", md: "3rem" }}
                pr={[".5rem", "1rem", null, "1.7rem"]}
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
                  onClick={onOpenLogin}
                >
                  Entrar
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
                  onClick={onOpenRegister}
                >
                  Registrar
                </Button>
              </Flex>
            </Show>
            <Show below="sm2">
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"hamburguer"}
                  cursor={"pointer"}
                  minW={0}
                  minH={"100%"}
                >
                  <HamburgerIcon />
                </MenuButton>
                <MenuList
                  display={"flex"}
                  flexDir={"column"}
                  alignItems={"flex-start"}
                  justifyContent={"flex-start"}
                  borderTopRadius={"0rem"}
                  borderBottomRadius={".5rem"}
                  maxH={"max-content"}
                  pt={"0px"}
                  minW={["14.5rem", "16.5rem"]}
                  bg={"gray.100"}
                  pb={{ base: ".5rem", sm2: "0rem" }}
                >
                  <Show below="sm2">
                    {BtnsDefault.map((link) => (
                      <MenuHamburguer key={link}>{link}</MenuHamburguer>
                    ))}
                  </Show>
                </MenuList>
              </Menu>
            </Show>
          </>
        )}
      </Flex>
      <ModalLogin onClose={onCloseLogin} isOpen={isOpenLogin} />
      <ModalRegister
        onClose={onCloseRegister}
        isOpen={isOpenRegister}
        onOpen={onOpenLogin}
      />
      <ModalLinks onClose={onCloseLinks} isOpen={isOpenLinks} />
    </Box>
  );
};

export default Header;
