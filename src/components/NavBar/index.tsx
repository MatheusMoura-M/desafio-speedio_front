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
} from "@chakra-ui/react";
import ModalLogin from "../Modals/Login";
import ModalRegister from "../Modals/Register";
import { useAuth } from "../../context/webContext";
import ModalLinks from "../Modals/Links/listLinks";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useEffect } from "react";

const Header = () => {
  const isPageTop100 = window.location.href.slice(22) === "top100";

  const BtnsDefault = ["Entrar", "Registrar", "Top 100 URLs"];
  const BtnsIsLogged = ["Meus links", "Top 100 URLs", "Sair", "Excluir conta"];
  const BtnsIsLoggedWithoutTop100 = ["Meus links", "Sair", "Excluir conta"];

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
    navigate,
  } = useAuth();

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
          minW={"70%"}
          w={"50%"}
          gap={"1rem"}
        >
          <Text
            minW={210}
            h={47}
            fontSize={"30px"}
            fontWeight={"bold"}
            textShadow={"#00000069 0.1em 0.1em 0.2em"}
            cursor={"pointer"}
            onClick={() => navigate("/")}
          >
            Link Shortener
          </Text>
          <Show breakpoint="(min-width: 640px)">
            <Flex gap={"1rem"} ml={"1rem"} alignItems={"flex-end"} h={"35px"}>
              {userLogged.id && (
                <Text
                  role={"group"}
                  minW={"max-content"}
                  h={"max-content"}
                  textAlign={"center"}
                  fontSize={"17px"}
                  fontWeight={500}
                  cursor={"pointer"}
                  transition={"ease-in-out"}
                  color={"gray.600"}
                  _hover={{
                    color: "gray.900",
                    transition: "ease-in-out",
                  }}
                  onClick={() => {
                    onOpenLinks();
                    getUserLinks();
                  }}
                >
                  Meus links
                  <Text
                    as={"span"}
                    h={"2px"}
                    bg={"#3c8aee"}
                    w={0}
                    display={"block"}
                    transition={".4s"}
                    _groupHover={{
                      transition: ".4s",
                      w: "100%",
                    }}
                  />
                </Text>
              )}
              {!isPageTop100 && (
                <Text
                  role={"group"}
                  minW={"max-content"}
                  h={"max-content"}
                  textAlign={"center"}
                  fontSize={"17px"}
                  fontWeight={500}
                  cursor={"pointer"}
                  onClick={() => navigate("/top100")}
                  transition={"ease-in-out"}
                  color={"gray.600"}
                  _hover={{
                    color: "gray.900",
                    transition: "ease-in-out",
                  }}
                >
                  Top 100 URLs
                  <Text
                    as={"span"}
                    h={"2px"}
                    bg={"#3c8aee"}
                    w={0}
                    display={"block"}
                    transition={".4s"}
                    _groupHover={{
                      transition: ".4s",
                      w: "100%",
                    }}
                  />
                </Text>
              )}
            </Flex>
          </Show>
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
                {isPageTop100
                  ? BtnsIsLoggedWithoutTop100.map((link) => (
                      <MenuHamburguer key={link}>{link}</MenuHamburguer>
                    ))
                  : BtnsIsLogged.map((link) => (
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
