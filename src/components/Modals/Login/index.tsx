import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { iStatusModal } from "../../../interface";
import { FormLogin } from "../../Forms/Login";

const ModalLogin = ({ isOpen, onClose }: iStatusModal) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        alignSelf={"center"}
        bg={"orange.1"}
        w={{ base: "80%", sm: "100%" }}
      >
        <ModalHeader
          fontSize={"16px"}
          color={"black"}
          bg={"orange.4"}
          borderTopRadius={"md"}
        >
          Entrar
        </ModalHeader>
        <Flex flexDir={"column"}>
          <ModalCloseButton />
          <ModalBody p={"0 24px 12px 24px"} w={"100%"}>
            <FormLogin onClose={onClose} />
          </ModalBody>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default ModalLogin;
