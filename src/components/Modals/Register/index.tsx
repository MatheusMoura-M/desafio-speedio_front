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
import { FormRegister } from "../../Forms/Register";

const ModalRegister = ({ isOpen, onClose, onOpen }: iStatusModal) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        alignSelf={"center"}
        bg={"#f4943e"}
        w={{ base: "80%", sm: "100%" }}
      >
        <ModalHeader
          fontSize={"16px"}
          color={"black"}
          bg={"#e54c03"}
          borderTopRadius={"md"}
        >
          Registrar
        </ModalHeader>
        <Flex flexDir={"column"}>
          <ModalCloseButton />
          <ModalBody p={"0 24px 12px 24px"} w={"100%"}>
            <FormRegister onClose={onClose} onOpen={onOpen!} />
          </ModalBody>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default ModalRegister;
