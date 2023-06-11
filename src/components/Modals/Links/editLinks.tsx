import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FormEditLink } from "../../Forms/EditLink";
import { iLinkResponse } from "../../../interface";

interface iStatusModalEdit {
  isOpen: boolean;
  onClose: () => void;
  elem: iLinkResponse;
}

const ModalEditLinks = ({ isOpen, onClose, elem }: iStatusModalEdit) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        alignSelf={"center"}
        bg={"#f4943e"}
        w={"85%"}
        minW={{ base: "80%", sm: 400 }}
        minH={150}
      >
        <ModalHeader
          fontSize={"16px"}
          color={"black"}
          bg={"#e54c03"}
          borderTopRadius={"md"}
        >
          Editar Titúlo
        </ModalHeader>
        <Flex flexDir={"column"}>
          <ModalCloseButton />
          <ModalBody p={"24px"} w={"100%"}>
            <FormEditLink onClose={onClose} elem={elem} />
          </ModalBody>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditLinks;
